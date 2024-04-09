import { prisma } from "@/lib/prisma";
import { IdManager } from "@/utils/IdManager";

// route: app\api\database\messages\check-risk-cases\route.js

export async function POST(req) {
  const { text, student_id } = await req.json();

  // Define the list of sensitive words to check for
  const sensitiveWords = ["morir", "matar", "suicidar", "suicidio"];

  // Check if the message contains any sensitive words
  const containsSensitiveWords = sensitiveWords.some((word) =>
    text.toLowerCase().includes(word)
  );

  if (containsSensitiveWords) {
    // Find the existing notification with code NTF-1700111-nnyyhh-600600
    const notification = await prisma.notification.findUnique({
      where: {
        id: "NTF-1700111-nnyyhh-600600",
      },
    });

    if (notification) {
      // Create a new complaint for the message
      const complaint = await prisma.complaint.create({
        data: {
          id: IdManager.complaintId(),
          content: text,
          message: {
            connect: {
              id: "MSG-testtes-testte-testte",
            },
          },
        },
      });

      // Create a new student notification linking the notification to the student
      const studentNotification = await prisma.studentNotification.create({
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
              id: notification.id,
            },
          },
        },
      });
    }
    return Response.json(true);
  }
  return Response.json(false);
}
