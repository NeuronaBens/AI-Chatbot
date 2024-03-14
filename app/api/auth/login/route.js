import { prisma } from "@/lib/prisma";
import { compare } from "bcrypt";
import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";

// directory location: app/api/auth/login

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Please enter an email and password" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "No user found" }, { status: 404 });
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = sign(
      {
        id: user.id,
        email: user.email,
        role: user.role.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Remove sensitive data
    const { password: _, ...userData } = user;

    return NextResponse.json({ user: userData, token });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
