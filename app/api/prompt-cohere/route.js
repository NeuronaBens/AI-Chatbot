import cohere from "cohere-ai";

cohere.init(process.env.COHERE_API_KEY);

export async function POST(request) {
  const response = await cohere.generate({
    model: "command",
    prompt: "this is a prompt",
    max_tokens: 200,
    temperature: 2,
  });

  let aiResponse = response;
  return Response.json(aiResponse);
}
