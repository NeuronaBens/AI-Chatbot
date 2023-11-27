import { prisma } from "@/lib/prisma";
import { IdManager } from '@/utils/IdManager'

export async function GET() {
    const messages = await prisma.message.findMany();
    return new Response(JSON.stringify(messages));
}

export async function POST(req){
  const {text, session, position, sender, deleted, bookmarked, student_id} = await req.json()

  const message = await prisma.message.create({
    data:{
      id: IdManager.messageId(),
      text: text,
      session: session,
      position: position,
      sender: sender,
      deleted: deleted,
      bookmarked:bookmarked,
      student: {
        connect:{
          student_id: student_id,
        }
      },
    }
  })

  return Response.json(message);
}
