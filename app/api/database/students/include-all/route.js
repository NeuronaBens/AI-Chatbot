//import { prisma } from "@/lib/prisma";
import { createServerClient } from "@/utils/supabase/client";

const supabase = createServerClient();

export async function GET() {
  /*const students = await prisma.student.findMany({
    include: {
      user: true,
      career: true,
      sex: true,
    },
  });*/

  const { data, error } = await supabase.from("Student").select(`
    student_id,
    description,
    career_id,
    date_of_birth,
    User(email),
    Career(name),
    Sex(name)
  `);

  return new Response(JSON.stringify(data));
}
