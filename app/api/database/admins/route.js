import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const admins = await prisma.admin.findMany();
  return new Response(JSON.stringify(admins));
}

export async function POST(req) {
  const { hierarchy } = await req.json();

  const admin = await prisma.admin.create({
    data: {
      hierarchy: hierarchy,
      user: {
        connect: {
          id: user_id,
        },
      },
    },
  });

  return NextResponse.json(admin);
}
