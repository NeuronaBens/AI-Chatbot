import { prisma } from "@/lib/prisma";

export async function GET() {
    const careers = await prisma.career.findMany();
    return new Response(JSON.stringify(careers));
}
