import { prisma } from "@/lib/prisma";

export async function GET(req, context) {
  const id = context.params.id;

  const task = await prisma.task.findUnique({
    where: { id: id },
  });

  if (!task) {
    return new Response("Error occurred", { status: 404 });
  }

  return new Response(JSON.stringify(task));
}
