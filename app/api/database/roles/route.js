import { prisma } from "@/lib/prisma";

export async function GET() {
    const roles = await prisma.role.findMany({
        include:{
            user:true,
        },
    });
    return new Response(JSON.stringify(roles));
}
