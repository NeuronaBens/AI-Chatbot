import Cohere from "cohere-ai";
Cohere.init(process.env.COHERE_API_KEY);

export async function POST(request) {
  try {
    // Replace this with your AI response generation logic
    const data = await request.json();
    let aiResponse = generateResponseOpenAI(data);
    return aiResponse;
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

//////////////////////////////////////////////////////////////////////////
// Function to generate responses based on the message, using open AI
//messages: [{ role: "user", content: "Say this is a test!" }],
async function generateResponseOpenAI(messages) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.OPENAI_API_KEY,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: 0.7,
    }),
  });
  const data = await res.json();
  return Response.json(data.choices[0].message.content);
}

//////////////////////////////////////////////////////////////////////////
//   const data = await request.json();
//    let aiResponse = generateResponseCohere(data.text);
//    return aiResponse;
async function generateResponseCohere(message) {
  const response = await Cohere.generate({
    model: "command",
    prompt: message,
    max_tokens: 200,
    temperature: 2,
  });

  let aiResponse = response.body.generations[0].text;
  return Response.json(aiResponse);
}

//////////////////////////////////////////////////////////////////////////
// Function to generate responses based on the message
function generateResponseHardcoded(message) {
  //message should be message object
  if (message.order === 2) {
    return "Comencemos preguntandote algunas cosillas, ¿Cuál es tu nombre?";
  } else if (message.order >= 2 && message.order <= 5) {
    if (message.order === 4) {
      return "¿Cuál es tu edad?";
    } else if (message.order === 6) {
      return "¿Cómo te sientes hoy?";
    } else if (message.order === 8) {
      return "¿Tienes alguna preocupación en particular?";
    } else if (message.order === 10) {
      return "¿En qué puedo ayudarte?";
    }
  } else {
    const lowercaseText = message.text.toLowerCase();
    if (
      lowercaseText.includes("triste") ||
      lowercaseText.includes("sad") ||
      lowercaseText.includes("deprimido")
    ) {
      return "Lamento escuchar que te sientes así. La tristeza puede ser normal y es solo un indicador de una enfermedad subyacente cuando los sentimientos se vuelven excesivos, en todo momento e interfieren con la vida cotidiana. ¿Quieres hablar al respecto?";
    } else if (
      lowercaseText.includes("angry") ||
      lowercaseText.includes("molesto") ||
      lowercaseText.includes("ira")
    ) {
      return "Lamento escuchar que te sientes enojado. La ira es una emoción natural, pero es importante manejarla de manera saludable. ¿Quieres hablar más sobre lo que te está haciendo sentir así?";
    } else {
      return "No estoy seguro de entender. ¿Puedes proporcionar más detalles?";
    }
  }
}
