import { prisma } from "@/lib/prisma";
import { IdManager } from "@/utils/IdManager";

export async function GET() {
  const tasks = await prisma.task.findMany();
  return new Response(JSON.stringify(tasks));
}

export async function POST(req) {
  const { name, content } = await req.json();

  const taskPost = await prisma.task.create({
    data: {
      id: IdManager.taskId(),
      name: name,
      content: content,
    },
  });

  return new Response(JSON.stringify(taskPost));
}
