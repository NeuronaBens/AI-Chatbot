export class Message {
  constructor(text, sender, order) {
    this.text = text;
    this.sender = sender;
    this.order = order;
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
}
