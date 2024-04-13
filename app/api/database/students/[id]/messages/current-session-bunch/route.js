import { prisma } from "@/lib/prisma";
import { IdManager } from "@/utils/IdManager";

export async function GET(req, { params }) {
  const id = params.id;

  const message = await prisma.message.findFirst({
    where: {
      student_id: id,
    },
    orderBy: {
      date_send: "desc",
    },
  });

  if (!message) {
    // If no messages are found, create the welcome message
    const newMessage = await prisma.message.create({
      data: {
        id: IdManager.messageId(),
        text: "Hola, soy Calmy, tu asistente psicológico personalizado ¿en qué puedo ayudarte hoy?",
        session: 1,
        position: 0,
        sender: false,
        deleted: false,
        bookmarked: false,
        student: {
          connect: {
            student_id: id,
          },
        },
      },
    });

    return Response.json([newMessage]);
  }

  const totalMessages = await prisma.message.count({
    where: {
      student_id: id,
      session: message.session,
      deleted: false,
    },
  });

  const skip = Math.max(0, totalMessages - 25);

  const messages = await prisma.message.findMany({
    where: {
      student_id: id,
      session: message.session,
      deleted: false,
    },
    orderBy: {
      position: "asc",
    },
    take: 25,
    skip: skip,
  });

  return Response.json(messages);
}
