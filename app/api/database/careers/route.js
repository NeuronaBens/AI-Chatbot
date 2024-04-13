import { prisma } from "@/lib/prisma";
import { IdManager } from "@/utils/IdManager";

export async function GET() {
  const careers = await prisma.career.findMany();
  return new Response(JSON.stringify(careers));
}

export async function POST(req) {
  const data = await req.json();

  if (Array.isArray(data)) {
    const createdCareers = await prisma.career.createMany({
      data: data.map((career) => ({
        id: IdManager.careerId(),
        name: career.name,
        description: career.description,
      })),
    });

    return new Response(JSON.stringify(createdCareers));
  } else {
    const createdCareer = await prisma.career.create({
      data: {
        id: IdManager.careerId(),
        name: data.name,
        description: data.description,
      },
    });

    return new Response(JSON.stringify(createdCareer));
  }
}
