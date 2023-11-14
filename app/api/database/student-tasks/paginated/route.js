import { prisma } from "@/lib/prisma";

export async function GET(req) {
  const { page = 1, pageSize = 10 } = req.nextUrl.searchParams;

  const skip = (page - 1) * pageSize;

  try {
    const students = await prisma.student.findMany({
      skip,
      take: pageSize,
    });

    const count = await prisma.student.count();
    const totalPages = Math.ceil(count / pageSize);

    return new Response(JSON.stringify({ students, totalPages }));
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
