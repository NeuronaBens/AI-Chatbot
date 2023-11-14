import { prisma } from "@/lib/prisma";

export async function GET(req, context) {
  const id = context.params.id;
  try {
    const studentTasks = await prisma.studentTask.findMany({
      where: {
        id: id,
      },
    });
    if (!studentTasks || studentTasks.length === 0) {
      return new Response("No tasks found for the student", { status: 404 });
    }
    return new Response(JSON.stringify(studentTasks));
  } catch (error) {
    return new Response("Error occurred: " + error.message, { status: 500 });
  }
}
