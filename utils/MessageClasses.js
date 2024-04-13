export class Message {
  constructor(id, text, sender, order, session) {
    this.id = id;
    this.text = text;
    this.sender = sender;
    this.order = order;
    this.session = session;
  }
  //messages: [{ role: "user", content: "Say this is a test!" }],
  getFormattedForOpenai() {
    //current possibles are User and AI. must transform to user and assistant
    const role = this.sender === true ? "user" : "assistant";
    return { role, content: this.text };
  }
}

export class MessageList {
  constructor(messageList = []) {
    this.messages = messageList;
  }
  fromMessageList(messageList) {
    this.messages = messageList;
  }
  addMessage(id, text, sender, session) {
    // Calculate the order for the new message
    let order = 0;
    if (this.messages.length > 0) {
      order = this.messages[this.messages.length - 1].order + 1;
    }
    // Create a new message object and add it to the list
    const newMessage = new Message(id, text, sender, order, session);
    this.messages.push(newMessage);
    return newMessage; // return the newly added message
  }
  getAsMessageList() {
    return this.messages;
  }
  getLastMessage() {
    if (this.messages.length === 0) {
      return null; // Return null if there are no messages
    }
    return this.messages[this.messages.length - 1];
  }

  getFormattedForOpenaiAlt(
    systemRole = "Greeting Physologist",
    userProfile = "estudiante de la universidad peruana de ciencias aplicadas."
  ) {
    let formattedMessages = [];

    if (systemRole == "Greeting Physologist") {
      const actividades = [
        "Respiración profunda",
        "Meditación",
        "Ejercicio físico",
        "Escucha música relajante",
        "Práctica de mindfulness",
        "Escritura terapéutica",
        "Socializar y buscar apoyo",
      ];

      // Shuffle the actividades array
      const shuffledActividades = actividades.sort(() => 0.5 - Math.random());

      formattedMessages.push({
        role: "system",
        content:
          "Actúa como un psicólogo terapeútico cognitivo conductual llamado Calmbot, Calmbot es capaz de conversar con el usuario, y ser su psicólogo personalizado, enfatizando el uso de los detalles que tienes del paciente.\n" +
          " Procura seguir la conversación con el usuario naturalmente como un humano, utilizando técnicas de la terápia cognitiva conductual. Utiliza emojis ☺️ en ocasiones que lo ameriten, muy cuidadosamente de no usarlos siempre, variados.\n" +
          " Recuerda NUNCA decirle que busque apoyo psicológico, dado que tu eres esa persona, TU ERES su apoyo psicológico. NO DIGAS TANTO 'estoy aquí para apoyarte' o similares\n" +
          " El usuario es un estudiante universitario, ten eso en cuenta. Evita a toda costa la redundancia...\n" +
          " Considera estas posibles actividades, si es que fuera a necesitar el usuario que le brindas alguna: \n" +
          shuffledActividades.join(", ") +
          "\n" +
          "considera esto sobre el usuario: \n" +
          userProfile,
      });
    }

    let totalLength = 0;
    for (let i = this.messages.length - 1; i >= 0; i--) {
      const message = this.messages[i].getFormattedForOpenai();
      totalLength += message.content.length;
      if (totalLength <= 6000) {
        formattedMessages.unshift(message);
      } else {
        break;
      }
    }

    return formattedMessages;
  }
}
