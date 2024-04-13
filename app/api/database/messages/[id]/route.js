import { prisma } from "@/lib/prisma";

export async function PUT(request, { params }) {
  const id = params.id;
  const data = await request.json();

  const message = await prisma.message.update({
    where: {
      id: id,
    },
    data: data,
  });

  return Response.json(message);
}

export async function GET(req, { params }) {
  const id = params.id;
  const message = await prisma.message.findUnique({
    where: {
      id: id,
    },
  });
  return new Response(JSON.stringify(message));
}
