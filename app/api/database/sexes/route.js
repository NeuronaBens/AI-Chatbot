import { prisma } from "@/lib/prisma";

export async function GET() {
  const sexes = await prisma.sex.findMany();
  return new Response(JSON.stringify(sexes));
}
