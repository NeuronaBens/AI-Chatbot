"use client";

import React, { useState, useEffect } from "react";
import TextBubble from "./textBubbles/text-bubble";
import TextInput from "./text-input";
import { Message, MessageList } from "@/utils/MessageClasses";
import ChatWelcome from "./chat-welcome";


const ChatContainer = (session) => {
  //////////////////////////////////
  ////////////////////// variables /
  //////////////////////////////////
  const [student, setStudent] = useState();
  const [chatSession, setChatSession] = useState();
  const [messages, setMessages] = useState(new MessageList([]));
  //console.log(session);

  const fetchData = async () => {
    try {
      const lastMessageResponse = await fetch(`/api/database/students/${session.user.id}/messages/last-message`);
      const lastMessageData = await lastMessageResponse.json();
      setChatSession(lastMessageData.session);

      const studentResponse = await fetch(`/api/database/students/${session.user.id}`);
      const studentData = await studentResponse.json();
      setStudent(studentData);

      const messagesResponse = await fetch(`/api/database/students/${session.user.id}/messages/session`, {
        method: "POST",
        body: JSON.stringify({
          session: chatSession,
        }),
        headers: {
        "Content-Type": "application/json",
        },});
      const messagesData = await messagesResponse.json();

      const newMessages = messagesData.map(item => new Message(item.id, item.text, item.sender == false?"AI":"User", item.position, chatSession));
      setMessages(new MessageList(newMessages));
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error appropriately, e.g., show an error message to the user
    }
  };

  useEffect(() => {
    fetchData();
  }, [session.user.id]);
  //////////////////////////////////
  /////////////////////// handlers /
  //////////////////////////////////
  const handleAddMessage = async ( text, sender ) => {
    try {
      const res = await fetch("/api/database/messages", {
      method: "POST",
      body: JSON.stringify({
        text: text,
        session: chatSession,
        position: messages.getAsMessageList().length,
        sender: sender == "User"?true:false,
        deleted: false,
        bookmarked: false,
        student_id: session.user.id,
      }),
      headers: {
      "Content-Type": "application/json",
      },});

      if (!res.ok) {
        throw new Error(`API call failed with status: ${res.status}`);
      }
      const newMessageData = await res.json();
      console.log(newMessageData);

      messages.addMessage(newMessageData.id, text, sender, chatSession );
      setMessages(new MessageList([...messages.messages])); // Create a new MessageList instance and set it as the new state
    } catch (error) {
      console.error(error);
    }
    
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
      await handleAddMessage(aiResponse, "AI");
    } catch (error) {
      console.error("API call error:", error);
    }
  };

  const handleUserMessage = async (text) => {
    // You can add a console.log here to see what is being sent to api.

    await handleAddMessage( text, "User");
    handleAIMessage(messages.getFormattedForOpenai("Greeting Physologist", "Mi nombre es " + session.user.name + ". " + student.description));
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
