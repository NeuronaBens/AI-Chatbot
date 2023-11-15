import { prisma } from "@/lib/prisma";

export async function GET(req) {
  const { page = 1, pageSize = 10 } = req.nextUrl.searchParams;

  const skip = (page - 1) * pageSize;
  const studentTasks = await prisma.studentTask.findMany({
    skip,
    take: pageSize,
    include: {
      student: true,
      task: true,
    },
  });
  const count = await prisma.studentTask.count();
  const totalPages = Math.ceil(count / pageSize);
  return new Response(JSON.stringify({ studentTasks, totalPages }));
}
