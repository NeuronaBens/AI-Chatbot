import { prisma } from "@/lib/prisma";

export async function POST(req,{ params }){
  const id = params.id
  const {session} = await req.json();

  const messages = await prisma.message.findMany({
    where: {
      student_id: id,
      session:session,
      deleted:false
    },
    orderBy: {
      position: 'asc'
    }
  })

  return Response.json(messages)
}