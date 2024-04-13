import { prisma } from "@/lib/prisma";

export async function GET(req, { params }){
  const id = params.id

  const message = await prisma.message.findFirst({
    where: {
      student_id: id,
    },
    orderBy: {
      date_send: 'desc'
    }
  })

  return Response.json(message)
}

export async function PUT(req, {params}) {
  const id = params.id;
  const data = await req.json();

  const existingMessage = await prisma.message.findFirst({
    where: {
      student_id: id,
    },
    orderBy: {
      date_send: 'desc'
    }
  });

  const updatedMessage = await prisma.message.update({
    where: { id: existingMessage.id },
    data: data,
  });

  return Response.json(updatedMessage);
}