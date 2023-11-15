import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { IdManager } from "@/utils/IdManager";

export async function GET() {
  const studentTasks = await prisma.studentTask.findMany();
  return new Response(JSON.stringify(studentTasks));
}

export async function POST(req) {
  const { student_id, task_id } = await req.json();

  const studentTask = await prisma.studentTask.create({
    data: {
      id: IdManager.studentTaskId(),
      completed: false,
      student: {
        connect: {
          id: student_id,
        },
      },
      task: {
        connect: {
          id: task_id,
        },
      },
    },
  });

  return NextResponse.json(studentTask);
}
