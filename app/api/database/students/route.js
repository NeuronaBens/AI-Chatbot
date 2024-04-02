import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { IdManager } from "@/utils/IdManager";

export async function GET() {
  const students = await prisma.student.findMany();
  return new Response(JSON.stringify(students));
}

export async function POST(req) {
  const { description, date_of_birth, sex_id, career_id, user_id } =
    await req.json();

  const student = await prisma.student.create({
    data: {
      description: description,
      date_of_birth: date_of_birth,
      user: {
        connect: {
          id: user_id,
        },
      },
      sex: {
        connect: {
          id: sex_id,
        },
      },
      career: {
        connect: {
          id: career_id,
        },
      },
    },
  });

  await prisma.settings.create({
    data: {
      id: IdManager.settingsId(),
      data_collection: true,
      theme: "Claro",
      student: {
        connect: {
          student_id: student.student_id,
        },
      },
    },
  });

  // Create the welcome student notification
  await prisma.studentNotification.create({
    data: {
      id: IdManager.notificationId(),
      read: false,
      student: {
        connect: {
          student_id: student.student_id,
        },
      },
      notification: {
        connect: {
          id: "NTF-1699934-aaaSmv-575469",
        },
      },
    },
  });

  return NextResponse.json(student);
}
