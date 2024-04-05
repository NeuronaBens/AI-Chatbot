import { prisma } from "@/lib/prisma";

// app\api\database\students\[id]\psicometrics\anxiety\route.js

export async function GET(req, context) {
  const id = context.params.id;

  const axietyLevels = await prisma.anxietyLevels.findMany({
    where: { student_id: id },
  });

  return new Response(JSON.stringify(axietyLevels));
}
