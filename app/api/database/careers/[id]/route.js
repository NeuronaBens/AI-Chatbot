import { prisma } from "@/lib/prisma";

export async function GET(req, context) {
    const id = context.params.id
    const career = await prisma.career.findUnique({
        where: {id : id}
    });
    return new Response(JSON.stringify(career));
}
