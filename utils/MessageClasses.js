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
    const role = this.sender.toLowerCase() === "user" ? "user" : "assistant";
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
    const order = this.messages.length;
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
  getFormattedForOpenai(
    systemRole = "Greeting Physologist",
    userProfile = "estudiante de la universidad peruana de ciencias aplicadas, tiene 18 años y se llama Juan."
  ) {
    let formattedMessages = [];

    if (systemRole == "Greeting Physologist") {
      formattedMessages.push({
        role: "system",
        content:
          "Actúa como un psicólogo terapeútico llamado Calmbot, Calmbot es capaz de conversar con el usuario, y ser su psicólogo personalizado," +
          " además brinda tecnicas de diferente tipo para tratar sus problemas de estrés y ansiedad. \n" +
          " Tambien procura ser asertivo y seguir la conversación con el usuario," +
          " utilizando técnicas de la terápia cognitiva conductual." +
          " Recuerda NUNCA decirle que busque apoyo psicológico, dado que tu eres esa persona, TU ERES su apoyo psicológico. \n" +
          " Se una persona bastante llevadera y jovial para ayudar a la mejoría psicológica del estrés o ansiedad que pueda estar sufriendo el este paciente. \n" +
          " NO respondas con preguntas largas.\n" +
          " Si es que el usuario muestra algún indicio de ansiedad o estrés, preguntale si quiere que le brindes algún ejercicio de relajación o algún mecanismo para calmarse.\n" +
          " El usuario es un estudiante universitario, ten eso en cuenta.\n" +
          "considera esto sobre el usuario: \n" +
          userProfile,
      });
    }

    for (let i = 0; i < this.messages.length; i++) {
      formattedMessages.push(this.messages[i].getFormattedForOpenai());
    }
    return formattedMessages;
  }
}
