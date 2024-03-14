import { prisma } from "@/lib/prisma";

//directory location: app/api/database/students/[id]/messages/bookmarked/route.js

export async function GET(req, { params }) {
  const id = params.id;

  const message = await prisma.message.findMany({
    where: {
      student_id: id,
      bookmarked: true,
    },
    orderBy: {
      position: "asc",
    },
  });

  return Response.json(message);
}
