import { prisma } from '@/lib/prisma'
import { hash } from 'bcrypt'
import { NextResponse } from 'next/server'
import { IdManager } from '@/utils/IdManager'

export async function POST(req) {
    const { name, email, password, image, deleted } = await req.json()

    const exist = await prisma.user.findUnique({
        where:{email}
    })

    if(exist){
        throw new Error("Email already exists")
    }

    const hashed = await hash(password, 12)

    const role = await prisma.role.findUnique({
        where: name = "User"
    });

    const user = await prisma.user.create({
        data: {
            id:IdManager.userId(), name, email, password: hashed, image, deleted, role_id: role.id
        }
    })

    return NextResponse.json({user})
}
