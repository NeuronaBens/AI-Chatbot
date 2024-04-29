import { IdManager } from "@/utils/IdManager";
import { createServerClient } from "@/utils/supabase/client";

const supabase = createServerClient();

export async function POST(req) {
  const { text, student_id, message_id } = await req.json();

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
      const { data: dataCom, error: errorCom } = await supabase
        .from("Complaint")
        .insert({
          id: IdManager.complaintId(),
          content: "El usuario ha enviado un mensaje riegoso",
          message_id: message_id,
        })
        .select();

      // Create a new student notification linking the notification to the student
      const { data: dataStask, error: errorStask } = await supabase
        .from("StudentNotification")
        .insert({
          id: IdManager.studentNotificationId(),
          read: false,
          student_id: student_id,
          notification_id: notification.id,
        })
        .select();

      if (errorCom || errorStask) {
        return Response.json(false);
      }
    }
    return Response.json(true);
  }
  return Response.json(false);
}
