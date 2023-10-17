import { prisma } from "@/lib/prisma";

export async function POST(request) {
  const users = await prisma.user.findMany();
  return new Response(JSON.stringify(users));
}
