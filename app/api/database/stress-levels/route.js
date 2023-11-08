import { prisma } from "@/lib/prisma";
import { IdManager } from '@/utils/IdManager'


export async function POST(req) {
    const { result, user_id } = await req.json()
    
    const stressLevel = await prisma.stressLevels.create({
        data: {
            id:IdManager.stressLevelsId(),
            stress:  result,
            student: {
                connect:{
                    student_id: user_id,
                }
            },
        }
    })

    return Response.json(stressLevel)
}