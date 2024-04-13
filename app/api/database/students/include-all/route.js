import { prisma } from "@/lib/prisma";

export async function GET() {
  const students = await prisma.student.findMany({
    include: {
      user: true,
      career: true,
      sex: true,
    },
  });

  return new Response(JSON.stringify(students));
}
