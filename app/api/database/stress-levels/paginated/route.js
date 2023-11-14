import { prisma } from "@/lib/prisma";

export async function GET(req) {
  const { page = 1, pageSize = 10 } = req.nextUrl.searchParams;

  const skip = (page - 1) * pageSize;
  const stressLevels = await prisma.stressLevels.findMany({
    skip,
    take: pageSize,
    orderBy: [
      {
        student_id: "desc", // or 'desc' for descending order
      },
      {
        date: "asc", // or 'desc' for descending order
      },
    ],
  });
  const count = await prisma.stressLevels.count();
  const totalPages = Math.ceil(count / pageSize);
  return new Response(JSON.stringify({ stressLevels, totalPages }));
}
