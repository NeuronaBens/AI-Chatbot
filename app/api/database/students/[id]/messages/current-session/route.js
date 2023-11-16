import { prisma } from "@/lib/prisma";

export async function GET(req,{ params }){
  const id = params.id

  const message = await prisma.message.findFirst({
    where: {
      student_id: id,
    },
    orderBy: {
      date_send: 'desc'
    }
  })

  const messages = await prisma.message.findMany({
    where: {
      student_id: id,
      session:message.session,
      deleted:false
    },
    orderBy: {
      position: 'asc'
    }
  })

  return Response.json(messages)
}
