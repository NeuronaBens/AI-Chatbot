"use client";

import React, { useState } from "react";
import TextBubble from "./text-bubble";
import TextInput from "./text-input";

const ChatContainer = () => {
  const [messages, setMessages] = useState([
    { text: "Buen día Amigo", aiResponse: true },
    { text: "¿Cuál es tu nombre?", aiResponse: true },
    // Add any initial messages here
  ]);

  const handleUserMessage = (text) => {
    // Add the user's message to the chat
    setMessages([...messages, { text, aiResponse: false }]);

    // Handle AI's response here and add it to the chat as well if needed
    // You can make an API call or use a chatbot library to get the AI's response
    // and then add it to the chat using setMessages.
  };

  return (
    <div className="grow">
      <div className="h-5/6 mb-32">
        <div className="w-5/6 mx-auto justify-center items-center">
          <h1 className="mt-5 text-4xl text-center font-bold">
            Bienvenido a <span className="text-orange-400">Calmbot!</span>
          </h1>
          <p className="text-center text-lg my-4">
            Tu chatbot de autoayuda y manejo del estrés y la ansiedad.
          </p>
          <p className="text-center mb-5 text-gray-500">
            Inicia tu conversación con un saludo.
          </p>
          <hr className="m-5"></hr>
        </div>
        {messages.map((message, index) => (
          <TextBubble
            key={index}
            text={message.text}
            aiResponse={message.aiResponse}
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
