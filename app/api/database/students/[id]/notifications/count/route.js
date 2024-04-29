import { prisma } from "@/lib/prisma";

export async function GET(req, { params }) {
  const id = params.id;

  const notifications = await prisma.studentNotification.aggregate({
    _count: {
      id: true,
    },
    where: {
      student_id: id,
      read: false,
    },
  });

  return Response.json(notifications._count);
}
