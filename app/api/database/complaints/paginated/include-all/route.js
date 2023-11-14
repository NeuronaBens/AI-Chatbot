import { prisma } from "@/lib/prisma";

export async function GET(req) {
  const { page = 1, pageSize = 10 } = req.nextUrl.searchParams;

  const skip = (page - 1) * pageSize;
  const complaints = await prisma.complaint.findMany({
    skip,
    take: pageSize,
    include: {
      message: true,
    },
  });
  const count = await prisma.complaint.count();
  const totalPages = Math.ceil(count / pageSize);
  return new Response(JSON.stringify({ complaints: complaints, totalPages }));
}
