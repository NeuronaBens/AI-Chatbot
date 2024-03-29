import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

//relative path: app\api\database\students\[id]\weekly-reset-tasks\route.js

export async function DELETE(req, { params }) {
  const id = params.id;

  // Calculate the date 7 days ago
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  // Delete student tasks that are more than 7 days old
  const deleted = await prisma.studentTask.deleteMany({
    where: {
      student_id: id,
      creation_date: {
        lte: sevenDaysAgo,
      },
    },
  });

  return NextResponse.json(deleted);
}
