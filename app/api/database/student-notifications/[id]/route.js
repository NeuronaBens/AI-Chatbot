export async function PUT(req,{ params }){
  const id = params.id
  const data = await req.json()

  const studentNoti = await prisma.studentNotification.update({
    where: {
      id: id
    },
    data: data,
  })

  return Response.json(studentNoti)
}
