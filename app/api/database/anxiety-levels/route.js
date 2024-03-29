import { prisma } from "@/lib/prisma";
import { IdManager } from "@/utils/IdManager";

export async function GET() {
  const anxietyLevels = await prisma.anxietyLevels.findMany();
  return new Response(JSON.stringify(anxietyLevels));
}

export async function POST(req) {
  const { result, user_id } = await req.json();

  const anxietyLevel = await prisma.anxietyLevels.create({
    data: {
      id: IdManager.anxietyLevelsId(),
      anxiety: result,
      student: {
        connect: {
          student_id: user_id,
        },
      },
    },
  });

  return Response.json(anxietyLevel);
}
