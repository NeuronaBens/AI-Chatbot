import { prisma } from "@/lib/prisma";

export async function GET(req, { params }){
  const id = params.id

  const message = await prisma.message.findMany({
    where: {
      student_id: id,
      bookmarked: true
    },
    orderBy: {
      position: 'asc'
    }
  })

  return Response.json(message)
}