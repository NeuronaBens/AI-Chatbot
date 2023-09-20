export async function POST(request) {
  try {
    const data = await request.json();
    const aiResponse = generateResponse(data); // Replace this with your AI response generation logic
    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400, // You can change the status code as needed
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

//////////////////////////////////////////////////////////////////////////

// Function to generate responses based on the message
function generateResponse(message) {
  if (message.order === 2) {
    return "Comencemos preguntandote algunas cosillas, ¿Cuál es tu nombre?";
  } else if (message.order >= 2 && message.order <= 5) {
    // You can handle different questions for orders 2 to 5 here
    // Example:
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
    // Handle user's messages related to emotions or triggers
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
      // Default response for other messages
      return "No estoy seguro de entender. ¿Puedes proporcionar más detalles?";
    }
  }
}
