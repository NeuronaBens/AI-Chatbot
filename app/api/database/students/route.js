import { prisma } from "@/lib/prisma";
import { NextResponse } from 'next/server';



export async function GET() {
    const students = await prisma.student.findMany();
    return new Response(JSON.stringify(students));
}

export async function POST(req) {
    const { description, date_of_birth, sex_id, career_id, user_id } = await req.json()
    
    const student = await prisma.student.create({
        data: {
            description:  description,
            date_of_birth: date_of_birth,
            user: {
                connect:{
                    id: user_id,
                }
            },
            sex: {
                connect:{
                    id: sex_id,
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