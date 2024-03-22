import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

//directory location: app/api/database/users/route.js

export async function POST(request) {
  try {
    const { name } = await request.json();

    const users = await prisma.user.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
