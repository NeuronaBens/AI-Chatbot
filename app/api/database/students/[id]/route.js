import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

//directory location: app\api\database\students\[id]\route.js

/*
{"student_id":"USR-1699205-8oNKSv-846310","description":"Estudiante de 9no ciclo de la UPC, me gusta la musica, los videojuegos, las peliculas de marvel y comer en restaurantes.","date_of_birth":"2000-08-05T00:00:00.000Z","sex_id":"SEX-1699229-ZUYHo0-511562","career_id":"CAR-1698378-oL8IIp-381381"}
*/

export async function GET(req, context) {
  const id = context.params.id;

  const student = await prisma.student.findUnique({
    where: { student_id: id },
  });

  return new Response(JSON.stringify(student));
}

export async function PUT(req) {
  const { student_id, description, date_of_birth, sex_id, career_id } =
    await req.json();

  try {
    const data = {};

    if (description !== undefined) {
      data.description = description;
    }

    if (date_of_birth !== undefined) {
      data.date_of_birth = new Date(date_of_birth);
    }

    if (sex_id !== undefined) {
      data.sex = { connect: { id: sex_id } };
    }

    if (career_id !== undefined) {
      data.career = { connect: { id: career_id } };
    }

    const updatedStudent = await prisma.student.update({
      where: { student_id: student_id },
      data: data,
    });

    return NextResponse.json(updatedStudent);
  } catch (error) {
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }
    if (error.code === "P2003") {
      if (error.meta.field_name === "sex_id") {
        return NextResponse.json({ error: "Invalid sex ID" }, { status: 400 });
      }
      if (error.meta.field_name === "career_id") {
        return NextResponse.json(
          { error: "Invalid career ID" },
          { status: 400 }
        );
      }
    }
    console.error("Error updating student:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
