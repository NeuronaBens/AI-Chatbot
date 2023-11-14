import { prisma } from "@/lib/prisma";

export async function GET(req, context) {
  const id = context.params.id;

  const student = await prisma.student.findUnique({
    where: { student_id: id },
    include: {
      user: true,
      career: true,
      sex: true,
    },
  });

  if (!student) {
    return new Response("Error occurred", { status: 404 });
  }

  const anxietyLevels = await prisma.anxietyLevels.findMany({
    where: { student_id: id },
  });

  const settings = await prisma.settings.findMany({
    where: { student_id: id },
  });

  const stressLevels = await prisma.stressLevels.findMany({
    where: { student_id: id },
  });

  const studentNotifications = await prisma.studentNotification.findMany({
    where: { student_id: id },
  });

  const studentTasks = await prisma.studentTask.findMany({
    where: { student_id: id },
  });

  // Construct a comprehensive student object
  const comprehensiveStudent = {
    ...student,
    anxietyLevels,
    settings,
    stressLevels,
    studentNotifications,
    studentTasks,
  };

  return new Response(JSON.stringify(comprehensiveStudent));
}
