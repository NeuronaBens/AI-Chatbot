// route: app\api\database\messages\is-risky\route.js

export async function POST(req) {
  const { text } = await req.json();

  // Define the list of sensitive words to check for
  const sensitiveWords = ["morir", "matar", "suicidar", "suicidio"];

  // Check if the message contains any sensitive words
  const containsSensitiveWords = sensitiveWords.some((word) =>
    text.toLowerCase().includes(word)
  );

  if (containsSensitiveWords) {
    console.log("is risky");
    return Response.json(true);
  }
  return Response.json(false);
}
