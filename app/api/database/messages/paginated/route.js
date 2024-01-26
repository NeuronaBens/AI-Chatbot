import { prisma } from "@/lib/prisma";

export async function GET(req) {
  let page = 1;
  let pageSize = 10;

  try {
    const nextPage = req.nextUrl.searchParams.get("page");
    const nextPageSize = req.nextUrl.searchParams.get("pageSize");
    if (nextPage !== null) {
      page = parseInt(nextPage, 10);
    } else {
      page = 1;
    }
    if (nextPageSize !== null) {
      pageSize = parseInt(nextPageSize, 10);
    } else {
      pageSize = 10;
    }
  } catch (error) {
    console.error("Error parsing page or pageSize:", error);
  }

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
