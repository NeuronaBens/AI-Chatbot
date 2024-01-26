import { prisma } from "@/lib/prisma";

export async function PUT(req,{ params }){
  const id = params.id
  const data = await req.json()

  const user = await prisma.user.update({
    where: {
      id: id
    },
    data: data,
  })

  return Response.json(user)
}