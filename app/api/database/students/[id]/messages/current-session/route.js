import { prisma } from "@/lib/prisma";

//example use: http://localhost:3000/api\database\students\USR-1710294-aHlbhf-935166\messages\current-session

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

  const messages = await prisma.message.findMany({
    where: {
      student_id: id,
      session: message.session,
      deleted: false,
    },
    orderBy: {
      position: "asc",
    },
  });

  return Response.json(messages);
}
