import { prisma } from "@/lib/prisma";

export async function GET() {
  const result = await prisma.$queryRaw`
      select * from get_all_users();
    `;

  return new Response(JSON.stringify(result));
}