import { prisma } from "@/lib/prisma";

export async function GET(req,{ params }){
  const id = params.id

  const notifications = await prisma.studentNotification.findMany({
    where: {
      student_id: id
    },
    include:{
      notification: true
    }
  })


  return Response.json(notifications)
}
