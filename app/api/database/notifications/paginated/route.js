import { prisma } from "@/lib/prisma";

export async function GET(req) {
  const { page = 1, pageSize = 10 } = req.nextUrl.searchParams;

  const skip = (page - 1) * pageSize;
  const notifications = await prisma.notification.findMany({
    skip,
    take: pageSize,
  });
  const count = await prisma.notification.count();
  const totalPages = Math.ceil(count / pageSize);
  return new Response(JSON.stringify({ notifications, totalPages }));
}
