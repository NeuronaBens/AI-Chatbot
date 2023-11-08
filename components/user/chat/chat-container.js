"use client";

import React, { useState, useEffect } from "react";
import TextBubble from "./textBubbles/text-bubble";
import TextInput from "./text-input";
import { Message, MessageList } from "@/utils/MessageClasses";
import ChatWelcome from "./chat-welcome";
import { useSession } from "next-auth/react";

const ChatContainer = () => {
  //////////////////////////////////
  ////////////////////// variables /
  //////////////////////////////////
  const session = useSession().data;
  const [student, setStudent] = useState();
  
  const [messages, setMessages] = useState(
    new MessageList([
      new Message(
        "1",
        "Hola, soy Calmbot, tu asistente psicológico personalizado ¿en qué puedo ayudarte hoy?",
        "AI",
        1
      ),
      // Add any initial messages here
    ])
  );

  useEffect(() => {

    fetch(`/api/database/students/${session.user.id}`).then((response) => response.json()).then((data) => setStudent(data));
    console.log("student",student);
    fetch(`/api/database/students/${session.user.id}/messages`)
      .then(response => response.json())
      .then(data => {
        //const messageList = new MessageList();

        data.forEach(item => {
          messages.addMessage(new Message(item.id, item.text, item.sender, item.position));
          //console.log(item);
        });

        setMessages(new MessageList([...messages.messages]));
      });
  }, []);

  //////////////////////////////////
  /////////////////////// handlers /
  //////////////////////////////////
  const handleAddMessage = (id, text, sender, ) => {
    messages.addMessage(id, text, sender );
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

  const handleUserMessage = async (text) => {
    // You can add a console.log here to see what is being sent to api.
    try {
      const res = await fetch("/api/database/messages", {
      method: "POST",
      body: JSON.stringify({
        session: session,
        position: position,
        sender: sender,
        deleted: deleted,
        bookmarked:bookmarked,
        student_id:session.user.id,
      }),
      headers: {
      "Content-Type": "application/json",
      },});

      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }


    } catch (error) {
      console.error(error);
    }
    handleAddMessage(session.user.id, text, "User");
    handleAIMessage(messages.getFormattedForOpenai(userProfile = student.description));
  };

  //////////////////////////////////
  //////////////////// return HTML /
  //////////////////////////////////
  return (
    <div className="grow">
      <div className="h-5/6 mb-32">
        <ChatWelcome />
        {messages.getAsMessageList().map((message, index) => (
          <TextBubble key={index} chatMessage={message} />
        ))}
      </div>
      <div className="w-full resize-none">
        <TextInput onUserMessage={handleUserMessage} />
      </div>
    </div>
  );
};

export default ChatContainer;
