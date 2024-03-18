import { prisma } from "@/lib/prisma";
import { Message, MessageList } from "@/utils/MessageClasses";
import { IdManager } from "@/utils/IdManager";

export async function GET(req, { params }) {
  const id = params.id;

  const messages = await prisma.message.findMany({
    where: {
      student_id: id,
    },
  });

  return Response.json(messages);
}

export async function POST(request, { params }) {
  try {
    const userId = params.id;
    console.log("User ID:", userId);

    const { message } = await request.json();
    console.log("Received message:", message);

    // Step 2: Retrieve the student information based on the provided session data
    const student = await prisma.student.findUnique({
      where: { student_id: userId },
    });
    console.log("Retrieved student:", student);

    // Step 3: Fetch the last message from the database for the given student
    const lastMessage = await prisma.message.findFirst({
      where: { student_id: userId },
      orderBy: { date_send: "desc" },
    });
    console.log("Last message:", lastMessage);

    // Step 4: Determine the current chat session based on the last message
    const currentSession = lastMessage ? lastMessage.session : 1;
    console.log("Current session:", currentSession);

    // Step 5: Fetch all messages for the current chat session from the database
    const sessionMessages = await prisma.message.findMany({
      where: {
        student_id: userId,
        session: currentSession,
      },
      orderBy: { position: "asc" },
    });
    console.log("Session messages:", sessionMessages);

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
    console.log("Converted messages:", messages);

    // Create a MessageList instance with the fetched messages
    const messageList = new MessageList(messages);
    console.log("MessageList instance:", messageList);

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
    console.log("New message created:", newMessage);

    messageList.addMessage(
      newMessage.id,
      newMessage.text,
      newMessage.sender,
      currentSession
    );
    console.log("Updated MessageList instance:", messageList);

    // Step 7: Generate an AI response using the message list and student information
    const formattedMessages = messageList.getFormattedForOpenai(
      "Greeting Physologist",
      `Mi nombre es ${student.name}. ${student.description}`
    );
    console.log("Formatted messages for OpenAI:", formattedMessages);

    const aiResponse = await generateResponseOpenAI(formattedMessages);
    console.log("AI response:", aiResponse);

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
    console.log("AI message created:", aiMessage);

    // Update the message list with the AI-generated message
    messageList.addMessage(
      aiMessage.id,
      aiMessage.text,
      aiMessage.sender,
      currentSession
    );
    console.log("Updated MessageList instance with AI message:", messageList);

    // Step : Return the AI-generated response as the API response
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
  console.log("Generating OpenAI response...");
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
  console.log("OpenAI response data:", data);
  return data.choices[0].message.content;
}
