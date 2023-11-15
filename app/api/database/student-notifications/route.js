import { prisma } from "@/lib/prisma";
import { IdManager } from "@/utils/IdManager";

export async function GET() {
  const studentNotifications = await prisma.studentNotification.findMany();
  return new Response(JSON.stringify(studentNotifications));
}

export async function POST(req) {
  const { student_id, notification_id } = await req.json();

  const notification = await prisma.studentNotification.create({
    data: {
      id: IdManager.notificationId(),
      read: false,
      student: {
        connect: {
          student_id: student_id,
        },
      },
      notification: {
        connect: {
          id: notification_id,
        },
      },
    },
  });

  return Response.json(notification);
}
