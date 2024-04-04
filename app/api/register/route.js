import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import { IdManager } from "@/utils/IdManager";

export async function POST(req) {
  const { name, email, password, image } = await req.json();

  try {
    const exist = await prisma.user.findUnique({
      where: { email: email },
    });

    if (exist) {
      return new Response(JSON.stringify({ error: "Email already exists" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const hashed = await hash(password, 12);
    const role = await prisma.role.findUnique({
      where: { name: "Student" },
    });

    const user = await prisma.user.create({
      data: {
        id: IdManager.userId(),
        name,
        email,
        password: hashed,
        image,
        role: {
          connect: { id: role.id },
        },
      },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
