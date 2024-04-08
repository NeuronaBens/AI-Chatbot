import { prisma } from "@/lib/prisma";
import { IdManager } from "@/utils/IdManager";

//path of the file: app\api\database\students\[id]\messages\start-new-session

export async function POST(req, { params }) {
  const id = params.id;

  // Fetch the last message from the database for the given student
  // Fetch the last message from the database for the given student
  const lastMessage = await prisma.message.findFirst({
    where: { student_id: id },
    orderBy: { date_send: "desc" },
  });

  // Fetch the first message of the last session
  const firstMessageOfLastSession = await prisma.message.findFirst({
    where: {
      student_id: id,
      session: lastMessage ? lastMessage.session : 0,
    },
    orderBy: { position: "asc" },
  });

  // Fetch all messages from the last session
  const lastSessionMessages = await prisma.message.findMany({
    where: {
      student_id: id,
      session: firstMessageOfLastSession.session,
    },
    orderBy: { position: "asc" },
  });

  // Extract the text content from the messages where sender is "student"
  const messageTexts = lastSessionMessages
    .filter((message) => message.sender == true)
    .map((message) => ({
      role: message.sender,
      content: message.text,
    }));

  // Generate a prompt for OpenAI to summarize the relevant information
  const prompt = [
    {
      role: "system",
      content: `realiza un resumen super corto de lo tocado aquí (3 cosas):${JSON.stringify(
        messageTexts
      )}\n\n el resumen es de miedos, traumas y cosas que esten pasando en su vida.`,
    },
  ];

  // Send the prompt to OpenAI and get the summary
  const summary = await generateResponseOpenAI(prompt);

  // Fetch the student's information from the database
  const student = await prisma.student.findUnique({
    where: { student_id: id },
  });

  // Find the index of the previous summary
  const summaryStartIndex = student.description.indexOf("\n+++\n");

  let updatedDescription;

  if (summaryStartIndex !== -1) {
    // If a previous summary exists, remove it and append the new summary
    const descriptionWithoutSummary = student.description.slice(
      0,
      summaryStartIndex
    );
    updatedDescription = `${descriptionWithoutSummary}\n+++\nResumen de la última sesión: \n${summary}`;
  } else {
    // If no previous summary exists, simply append the new summary
    updatedDescription = `${student.description}\n+++\nResumen de la última sesión: \n${summary}`;
  }

  // Update the student's description in the database
  await prisma.student.update({
    where: { student_id: id },
    data: { description: updatedDescription },
  });

  // Add a new message for the new session (session + 1) that says "Hola de nuevo ☺️"
  const newSession = lastMessage ? lastMessage.session + 1 : 1;
  const newPosition = lastMessage ? lastMessage.position + 1 : 1;

  const aiMessage = await prisma.message.create({
    data: {
      id: IdManager.messageId(),
      student_id: id,
      session: newSession,
      position: newPosition,
      sender: false,
      bookmarked: false,
      date_send: new Date(),
      deleted: false,
      text: "Hola nuevamente :) ¿Como te has sentido hoy?",
    },
  });

  return Response.json(aiMessage);
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
