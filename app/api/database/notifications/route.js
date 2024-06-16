import { prisma } from "@/lib/prisma";
import { IdManager } from "@/utils/IdManager";

export async function GET() {
  const notifications = await prisma.notification.findMany();
  return new Response(JSON.stringify(notifications));
}

export async function POST(req) {
  const { content, name, admin_id } = await req.json();

  const old_noti = await prisma.notification.findFirst({
    where: { name: name },
  });

  if (old_noti != null) {
    return Response.json(old_noti);
  }

  const notification = await prisma.notification.create({
    data: {
      id: IdManager.notificationId(),
      content: content,
      name: name,
      admin: {
        connect: {
          admin_id: admin_id,
        },
      },
    },
  });

  return Response.json(notification);
}
