"use client";

import React, { useState, useEffect } from "react";
import TextBubble from "./textBubbles/text-bubble";
import TextInput from "./text-input";
import { Message, MessageList } from "@/utils/MessageClasses";
import ChatWelcome from "./chat-welcome";
import Dialog from "@/components/general/modal";
import { TaskManager } from "@/utils/TaskManager";

const ChatContainer = (session) => {
  //////////////////////////////////
  ////////////////////// variables /
  //////////////////////////////////
  const [student, setStudent] = useState(null);
  const [isloadingStudent, setIsLoadingStudent] = useState(true);
  const [chatSession, setChatSession] = useState(1);
  const [messages, setMessages] = useState(new MessageList([]));
  const [isloadingMess, setIsLoadingMess] = useState(true);

  const handleStudent = async () => {
    try {
      const studentResponse = await fetch(
        `/api/database/students/${session.user.id}`
      );
      const studentData = await studentResponse.json();
      setStudent(studentData);
      setIsLoadingStudent(false);
    } catch (error) {
      console.error(error);
    }
  };
  //console.log(session);

  const fetchData = async () => {
    try {
      if (student) {
        const lastMessageResponse = await fetch(
          `/api/database/students/${session.user.id}/messages/last-message`
        );
        const lastMessageData = await lastMessageResponse.json();
        if (lastMessageData) {
          setChatSession(lastMessageData.session);
          const messagesResponse = await fetch(
            `/api/database/students/${session.user.id}/messages/session`,
            {
              method: "POST",
              body: JSON.stringify({
                session: chatSession,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const messagesData = await messagesResponse.json();
          const newMessages = messagesData.map(
            (item) =>
              new Message(
                item.id,
                item.text,
                item.sender,
                item.position,
                chatSession
              )
          );
          setMessages(new MessageList(newMessages));
          setIsLoadingMess(false);
        } else {
          setChatSession(1);
          await handleAddMessage(
            "Hola, soy Calmbot, tu asistente psicológico personalizado ¿en qué puedo ayudarte hoy?",
            false
          );
          setIsLoadingMess(false);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error appropriately, e.g., show an error message to the user
    }
  };

  async function onClose() {
    console.log("Modal has closed");
    await handleStudent();
  }

  async function onOk() {
    console.log("Ok was clicked");
  }

  const modalProps = {
    title: "Student Information",
    type: "form",
    showDialog: true,
    width: "600px",
    onClose: onClose,
    onOk: onOk,
  };

  useEffect(() => {
    if (student == null) {
      handleStudent();
    }
    fetchData();
  }, [session, student, chatSession]);

  const deleteMessage = async (index) => {
    const newMessages = messages.getAsMessageList();
    newMessages.splice(index, 1); // Remove the message from the array

    setMessages(new MessageList([...newMessages]));
  };

  //////////////////////////////////
  /////////////////////// handlers /
  //////////////////////////////////
  const handleAddMessage = async (text, sender) => {
    try {
      const res = await fetch("/api/database/messages", {
        method: "POST",
        body: JSON.stringify({
          text: text,
          session: chatSession,
          position: messages.getLastMessage()
            ? messages.getLastMessage().order + 1
            : 0,
          sender: sender,
          deleted: false,
          bookmarked: false,
          student_id: session.user.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`API call failed with status: ${res.status}`);
      }
      const newMessageData = await res.json();
      //console.log(newMessageData);

      messages.addMessage(newMessageData.id, text, sender, chatSession);
      setMessages(new MessageList([...messages.messages])); // Create a new MessageList instance and set it as the new state

      await TaskManager.processTasks(text, session.user.id); //a task if necesary is added
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
      await handleAddMessage(aiResponse, false);
    } catch (error) {
      console.error("API call error:", error);
    }
  };

  const handleUserMessage = async (text) => {
    // You can add a console.log here to see what is being sent to api.

    await handleAddMessage(text, true);
    handleAIMessage(
      messages.getFormattedForOpenai(
        "Greeting Physologist",
        "Mi nombre es " + session.user.name + ". " + student.description
      )
    );
  };

  //////////////////////////////////
  //////////////////// return HTML /
  //////////////////////////////////

  if (student == null && !isloadingStudent)
    return (
      <div className="grow">
        <ChatWelcome />
        <Dialog props={modalProps}></Dialog>
      </div>
    );

  if (isloadingMess)
    return (
      <div className="grow">
        <ChatWelcome />
      </div>
    );

  return (
    <div className="grow">
      <ChatWelcome />
      <div>
        <div className="h-5/6 mb-32">
          {messages.getAsMessageList().map((message, index) => (
            <TextBubble
              key={index}
              chatMessage={message}
              onDelete={deleteMessage}
            />
          ))}
        </div>
        <div className="w-full resize-none">
          <TextInput onUserMessage={handleUserMessage} />
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
