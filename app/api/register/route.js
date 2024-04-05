import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import { IdManager } from "@/utils/IdManager";

const isValidEmail = (email) => {
  // Simple email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const INVITATION_CODE = process.env.INVITATION_CODE;

export async function POST(req) {
  var { name, email, password, image, invitationCode } = await req.json();

  try {
    // Validate email
    if (!isValidEmail(email)) {
      return new Response(JSON.stringify({ error: "Invalid email address" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Set email to all lowercase
    email = email.toLowerCase();

    // Validate password length
    if (password.length < 8) {
      return new Response(
        JSON.stringify({
          error: "Password must be at least 8 characters long",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Validate invitation code
    if (invitationCode !== INVITATION_CODE) {
      return new Response(
        JSON.stringify({ error: "Invalid invitation code" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Validate non reapeted user
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
