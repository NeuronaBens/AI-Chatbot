export class Message {
  constructor(text, sender, order) {
    this.text = text;
    this.sender = sender;
    this.order = order;
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
  addMessage(text, sender) {
    // Calculate the order for the new message
    const order = this.messages.length + 1;
    // Create a new message object and add it to the list
    const newMessage = new Message(text, sender, order);
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
          "Actúa como un psicólogo terapeútico, que es capaz de conversar con el usuario, brindarle feedback sobre sus problemas," +
          " además de tecnicas de diferente tipo para tratar sus problemas de estrés y ansiedad." +
          " Tambien procura ser asertivo y seguir la conversación con el usuario," +
          " utilizando técnicas de la terápia cognitiva conductual." +
          " Recuerda nunca decirle que busco apoyo psicológico, dado que tu eres esa persona, tu eres su apoyo psicológico." +
          " Se una persona bastante llevadera y jovial para ayudar a la mejoría psicológica del estrés o ansiedad que pueda estar sufriendo el este paciente." +
          " No respondas con preguntas demasiado largas." +
          " El usuario es un estudiante universitario, ten eso en cuenta." +
          "considera esto sobre el usuario: " +
          userProfile,
      });
    }

    for (let i = 0; i < this.messages.length; i++) {
      formattedMessages.push(this.messages[i].getFormattedForOpenai());
    }
    return formattedMessages;
  }
}
