import { prisma } from '@/lib/prisma'
import { hash } from 'bcrypt'
import { NextResponse } from 'next/server'

function randomStr(strLength) {
    const chars = [...'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    return [...Array(strLength)]
      .map(() => chars[Math.trunc(Math.random() * chars.length)])
      .join('');
}
  
function uid(options = {}) {
    const now = String(Date.now());
    const middlePos = Math.ceil(now.length / 2);
    let output = `${now.substr(0, middlePos)}-${randomStr(6)}-${now.substr(middlePos)}`;
    // We add a 3 letter CODE in front of the id to make it more recognizable
    if (options.prefix) output = `${options.prefix}-${output}`;
    return output;
}

export async function POST(req) {
    const { name, email, password, image, deleted, role } = await req.json()

    const exist = await prisma.user.findUnique({
        where:{email}
    })

    if(exist){
        throw new Error("Email already exists")
    }

    const hashed = await hash(password, 12)

    const user = await prisma.user.create({
        data: {
            id:uid({prefix:'USR'}), name, email, password: hashed, image, deleted, role
        }
    })

    return NextResponse.json({user})
}
