import { prisma } from "@/lib/prisma";

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
