import { prisma } from "@/lib/prisma";

//directory location: app\api\database\students\[id]\get-settings-related-mobile

/*
Example json:
{"student_id":"USR-1699205-8oNKSv-846310",
"description":"Estudiante de 9no ciclo de la UPC, me gusta la musica, los videojuegos, las peliculas de marvel. ",
"date_of_birth":"2000-08-05T00:00:00.000Z",
"sex_id":"SEX-1699229-ZUYHo0-511562",
"career_id":"CAR-1698378-oL8IIp-381381",
"user":{"id":"USR-1699205-8oNKSv-846310",
"name":"Alejandro",
"email":"ale@gmail.com",
"password":"$2b$12$XJGnmC4/I/8CMvabFAcjzuhjmdmIU.9qYgizz/rKxpKNKhbvFaYL.",
"image":"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
"deleted_at":null,"role_id":"ROL-1698377-JwEAl6-552536"},
"career":{"id":"CAR-1698378-oL8IIp-381381",
"name":"Ingeniería de Software",
"description":"Creación y desarrollo de software y aplicaciones"},
"sex":{"id":"SEX-1699229-ZUYHo0-511562","name":"Masculino"},
"settings":{"id":"STG-1700032-1tjqFv-681691",
"data_collection":true,
"theme":"Claro",
"student_id":"USR-1699205-8oNKSv-846310"}
}
*/

export async function GET(req, context) {
  const id = context.params.id;

  const student = await prisma.student.findUnique({
    where: { student_id: id },
    include: {
      user: true,
      career: true,
      sex: true,
      settings: true,
    },
  });

  if (!student) {
    return new Response("Error occurred", { status: 404 });
  }

  return new Response(JSON.stringify(student));
}
