import { prisma } from "@/lib/prisma";

export async function PUT(request,{ params }){
  const id = params.id
  const data = await request.json()

  const message = await prisma.message.update({
    where: {
      id: id
    },
    data: data,
  })

  return Response.json(message)
}