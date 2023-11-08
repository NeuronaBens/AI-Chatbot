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