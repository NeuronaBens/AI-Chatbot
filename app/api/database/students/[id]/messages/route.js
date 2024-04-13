import { prisma } from "@/lib/prisma";
import { Message, MessageList } from "@/utils/MessageClasses";
import { IdManager } from "@/utils/IdManager";
import { TaskManager } from "@/utils/TaskManager";

//example use: http://localhost:3000/api\database\students\USR-1710294-aHlbhf-935166\messages

export async function GET(req, { params }) {
  const id = params.id;

  const messages = await prisma.message.findMany({
    where: {
      student_id: id,
    },
    orderBy: {
      position: "asc",
    },
  });

  return Response.json(messages);
}

export async function POST(request, { params }) {
  try {
    const userId = params.id;

    const { message } = await request.json();

    // Step 1: Retrieve the user information based on the provided session data
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    // Step 2: Retrieve the student information based on the provided session data
    const student = await prisma.student.findUnique({
      where: { student_id: userId },
    });

    // Step 3: Fetch the last message from the database for the given student
    const lastMessage = await prisma.message.findFirst({
      where: { student_id: userId },
      orderBy: { date_send: "desc" },
    });

    // Step 4: Determine the current chat session based on the last message
    const currentSession = lastMessage ? lastMessage.session : 1;

    // Step 5: Fetch all messages for the current chat session from the database
    const sessionMessages = await prisma.message.findMany({
      where: {
        student_id: userId,
        session: currentSession,
      },
      orderBy: { position: "asc" },
    });

    // Convert the fetched messages to Message objects
    const messages = sessionMessages.map(
      (item) =>
        new Message(
          item.id,
          item.text,
          item.sender,
          item.position,
          currentSession
        )
    );

    // Create a MessageList instance with the fetched messages
    const messageList = new MessageList(messages);

    // Step 6: Add the new message to the database and update the message list
    const newMessage = await prisma.message.create({
      data: {
        id: IdManager.messageId(), // Add this line to generate a unique id
        text: message,
        session: currentSession,
        position: messageList.getLastMessage()
          ? messageList.getLastMessage().order + 1
          : 0,
        sender: true,
        deleted: false,
        bookmarked: false,
        student_id: userId,
      },
    });

    messageList.addMessage(
      newMessage.id,
      newMessage.text,
      newMessage.sender,
      currentSession
    );

    // Step 7: Generate an AI response using the message list and student information
    const formattedMessages = messageList.getFormattedForOpenaiAlt(
      "Greeting Physologist",
      `Mi nombre es ${user.name}. ${student.description}`
    );

    const aiResponse = await generateResponseOpenAI(formattedMessages);

    // Step 9: Store the AI-generated response in the database
    const aiMessage = await prisma.message.create({
      data: {
        id: IdManager.messageId(),
        text: aiResponse,
        session: currentSession,
        position: messageList.getLastMessage()
          ? messageList.getLastMessage().order + 1
          : 0,
        sender: false,
        deleted: false,
        bookmarked: false,
        student_id: userId,
      },
    });

    // Update the message list with the AI-generated message
    messageList.addMessage(
      aiMessage.id,
      aiMessage.text,
      aiMessage.sender,
      currentSession
    );

    // Step 10: Call the TaskManager.processTasks method to check for matching tasks and create a new student task
    try {
      const taskResult = await TaskManager.processTasks(aiResponse, userId);
      if (taskResult.success) {
      } else {
        throw new Error(taskResult.error);
      }
    } catch (error) {
      console.error("Error in API processing task:", error.message);
    }

    // Step 11: Return the AI-generated response as the API response
    return Response.json(aiMessage);
  } catch (error) {
    console.error("Error in POST request:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

async function generateResponseOpenAI(messages) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.OPENAI_API_KEY,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: 0.7,
    }),
  });
  const data = await res.json();
  return data.choices[0].message.content;
}
