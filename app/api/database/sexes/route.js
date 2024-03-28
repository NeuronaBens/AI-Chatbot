import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { IdManager } from "@/utils/IdManager";

export async function GET() {
  const sexes = await prisma.sex.findMany();
  return new Response(JSON.stringify(sexes));
}

export async function POST(req) {
  const { name, names } = await req.json();

  let createdSexes = [];

  if (name) {
    const createdSex = await prisma.sex.create({
      data: {
        id: IdManager.sexId(),
        name: name,
      },
    });
    createdSexes.push(createdSex);
  } else if (names) {
    createdSexes = await Promise.all(
      names.map(async (n) => {
        return await prisma.sex.create({
          data: {
            id: IdManager.sexId(),
            name: n,
          },
        });
      })
    );
  }

  return NextResponse.json(createdSexes);
}
