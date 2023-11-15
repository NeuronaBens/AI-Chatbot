import { prisma } from "@/lib/prisma";

export async function GET(req) {
  const { page = 1, pageSize = 10 } = req.nextUrl.searchParams;

  const skip = (page - 1) * pageSize;
  const messages = await prisma.message.findMany({
    skip,
    take: pageSize,
    orderBy: { date_send: "desc" }, // You can change 'date_send' to the column you want to sort by
  });

  const count = await prisma.message.count();
  const totalPages = Math.ceil(count / pageSize);
  return new Response(JSON.stringify({ messages, totalPages }));
}
