import { prisma } from "@/lib/prisma";
import { IdManager } from "@/utils/IdManager";

export async function GET() {
  const careers = await prisma.career.findMany();
  return new Response(JSON.stringify(careers));
}

export async function POST(req) {
  const { name, description } = await req.json();

  const careerPost = await prisma.career.create({
    data: {
      id: IdManager.careerId(),
      name: name,
      description: description,
    },
  });

  return new Response(JSON.stringify(careerPost));
}
