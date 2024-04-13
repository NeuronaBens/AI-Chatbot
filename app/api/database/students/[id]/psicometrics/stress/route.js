import { prisma } from "@/lib/prisma";

// app\api\database\students\[id]\psicometrics\stress\route.js

export async function GET(req, context) {
  const id = context.params.id;

  const stressLevels = await prisma.stressLevels.findMany({
    where: { student_id: id },
  });

  return new Response(JSON.stringify(stressLevels));
}
