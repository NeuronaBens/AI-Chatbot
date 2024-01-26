import { prisma } from "@/lib/prisma";

export async function GET(req,{ params }){
  const id = params.id

  const messages = await prisma.message.findMany({
    where: {
      student_id: id
    },
  })

  return Response.json(messages)
}