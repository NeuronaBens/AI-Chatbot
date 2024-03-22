import { prisma } from "@/lib/prisma";

//directory location: app/api/database/students/[id]/settings/route.js

/*
Example json response:
{
    "id": "STG-1700032-1tjqFv-681691",
    "data_collection": true,
    "theme": "Claro",
    "student_id": "USR-1699205-8oNKSv-846310"
}
*/

export async function GET(req, { params }) {
  const id = params.id;

  const settings = await prisma.settings.findUnique({
    where: {
      student_id: id,
    },
  });

  return Response.json(settings);
}

export async function PUT(req, { params }) {
  const id = params.id;
  const data = await req.json();

  const settings = await prisma.settings.update({
    where: {
      student_id: id,
    },
    data: data,
  });

  return Response.json(settings);
}
