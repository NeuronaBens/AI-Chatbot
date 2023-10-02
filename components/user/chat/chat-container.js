"use client";

import React, { useState } from "react";
import TextBubble from "./text-bubble";
import TextInput from "./text-input";
import { Message, MessageList } from "@/utils/MessageClasses";
import ChatWelcome from "./chat-welcome";

const ChatContainer = () => {
  //////////////////////////////////
  ////////////////////// variables /
  //////////////////////////////////
  const [messages, setMessages] = useState(
    new MessageList([
      new Message("Hola, ¿en qué puedo ayudarte hoy?", "AI", 1),
      // Add any initial messages here
    ])
  );

  //////////////////////////////////
  /////////////////////// handlers /
  //////////////////////////////////
  const handleAddMessage = (text, sender) => {
    messages.addMessage(text, sender);
    setMessages(new MessageList([...messages.messages])); // Create a new MessageList instance and set it as the new state
  };

  const handleAIMessage = async (inputData) => {
    try {
      const response = await fetch("/api/prompt-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData), // Send the required input
      });

      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }

      const data = await response.json();

      // Handle the AI's response and add it to the chat
      const aiResponse = data;
      handleAddMessage(aiResponse, "AI");
    } catch (error) {
      console.error("API call error:", error);
    }
  };

  const handleUserMessage = (text) => {
    // You can add a console.log here to see what is being sent to api.
    handleAddMessage(text, "User");
    handleAIMessage(messages.getFormattedForOpenai());
  };

  //////////////////////////////////
  //////////////////// return HTML /
  //////////////////////////////////
  return (
    <div className="grow">
      <div className="h-5/6 mb-32">
        <ChatWelcome />
        {messages.getAsMessageList().map((message, index) => (
          <TextBubble
            key={index}
            text={message.text}
            aiResponse={message.sender === "AI"}
          />
        ))}
      </div>
      <div className="w-full resize-none">
        <TextInput onUserMessage={handleUserMessage} />
      </div>
    </div>
  );
};

export default ChatContainer;
