import { prisma } from "@/lib/prisma";
import { IdManager } from "@/utils/IdManager";

//directory location: app/api/database/complaints/route.js

export async function GET() {
  const complaints = await prisma.complaint.findMany();
  return new Response(JSON.stringify(complaints));
}

export async function POST(req) {
  const { content, message_id } = await req.json();

  const complaint = await prisma.complaint.create({
    data: {
      id: IdManager.complaintId(),
      content: content,
      message: {
        connect: {
          id: message_id,
        },
      },
    },
  });

  return Response.json(complaint);
}
