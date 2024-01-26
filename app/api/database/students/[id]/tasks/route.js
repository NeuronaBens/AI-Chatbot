import { prisma } from "@/lib/prisma";

export async function GET(req,{ params }){
  const id = params.id

  const tasks = await prisma.studentTask.findMany({
    where: {
      student_id: id
    },
    include:{
      task: true,
    }
  })


  return Response.json(tasks)
}
