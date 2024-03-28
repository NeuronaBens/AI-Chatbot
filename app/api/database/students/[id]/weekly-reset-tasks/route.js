import { prisma } from "@/lib/prisma";

export async function POST(req, { params }) {
  const id = params.id;

  // Fetch the last message from the database for the given student
  const tasks = await prisma.studentTask.findMany({
    where: { student_id: id },
    orderBy: { date_send: "asc" },
  });

  //erase any case of 1 week old.
  //...
}
