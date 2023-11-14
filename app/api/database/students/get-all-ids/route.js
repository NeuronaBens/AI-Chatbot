import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const studentIds = await prisma.student.findMany({
      select: {
        id: true,
      },
    });

    const ids = studentIds.map((student) => student.id);
    return new Response(JSON.stringify(ids));
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch student IDs" }),
      {
        status: 500,
      }
    );
  }
}
