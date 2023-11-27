import { prisma } from "@/lib/prisma";

export async function GET(req, context) {
    const id = context.params.id
    
    const student = await prisma.student.findUnique({
        where: {student_id : id}
    });
    
    return new Response(JSON.stringify(student));
    
}
