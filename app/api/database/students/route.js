import { prisma } from "@/lib/prisma";
import { NextResponse } from 'next/server';



export async function GET() {
    const students = await prisma.student.findMany();
    return new Response(JSON.stringify(students));
}

export async function POST(req) {
    const { description, career_id, user_id } = await req.json()

    const student = await prisma.student.create({
        data: {
            description,
            user: {
                connect:{
                    id: user_id,
                }
            },
            career: {
                connect:{
                    id: career_id,
                }
            }
        }
    })

    return NextResponse.json({student})
}