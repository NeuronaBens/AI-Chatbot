import { prisma } from "@/lib/prisma";
import { IdManager } from "@/utils/IdManager";

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

export async function PUT(req,{ params }){
  const id = params.id
  const data = await req.json()

  const messages = await prisma.message.updateMany({
    where: {
      student_id: id
    },
    data: data,
  })

  const lastMessage = await prisma.message.findFirst({
    where: {
      student_id: id,
    },
    orderBy: {
      date_send: 'desc'
    }
  })

  const newConversation = await prisma.message.create({
    data:{
      id: IdManager.messageId(),
      text: "Hola, soy Calmbot, tu asistente psicológico personalizado ¿en qué puedo ayudarte hoy?",
      session: lastMessage.session + 1,
      position: 0,
      sender: false,
      deleted: false,
      bookmarked:false,
      student: {
        connect:{
          student_id: id,
        }
      },
    }
  })


  return Response.json(messages)
}
