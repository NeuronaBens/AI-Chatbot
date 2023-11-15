import { prisma } from "@/lib/prisma";

export async function GET(req,{ params }){
  const id = params.id

  const settings = await prisma.settings.findMany({
    where: {
      student_id: id
    },
  })

  return Response.json(settings)
}

export async function PUT(req,{ params }){
  const id = params.id
  const data = await req.json()

  const settings = await prisma.settings.update({
    where: {
      student_id: id
    },
    data: data,
  })

  return Response.json(settings)
}
