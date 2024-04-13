import { prisma } from "@/lib/prisma";

export async function GET() {
  const complaints = await prisma.complaint.findMany({
    include: {
      message: true,
    },
  });
  return new Response(JSON.stringify(complaints));
}
