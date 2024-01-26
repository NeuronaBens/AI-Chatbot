import { prisma } from "@/lib/prisma";

export async function GET(req) {
  const { page = 1, pageSize = 10 } = req.nextUrl.searchParams;

  const skip = (page - 1) * pageSize;
  const sexes = await prisma.sex.findMany({
    skip,
    take: pageSize,
  });
  const count = await prisma.sex.count();
  const totalPages = Math.ceil(count / pageSize);
  return new Response(JSON.stringify({ sexes, totalPages }));
}
