import { prisma } from '@/lib/prisma'
import { hash } from 'bcrypt'
import { NextResponse } from 'next/server'

export async function POST(req) {
    const body = await req.json();
    const { name, email, password, image, deleted, description, role } = body.data;

    const exist = await prisma.user.findUnique({
        where: email
    });

    if(exist){
        throw new Error("Email already exists")
    }

    const hashed = await hash(password, 12)
    const user = await prisma.user.create({
        data: {
            name, email, password: hashed, image, deleted, description, role
        }
    })

    return NextResponse.json({user})
}
