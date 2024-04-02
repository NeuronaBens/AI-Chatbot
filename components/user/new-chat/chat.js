"use client";

import {useChat} from "ai/react"
import React, { useState, useEffect } from "react";
import ChatWelcome from "./chat-welcome";
import Dialog from "@/components/general/modal";
import TextInput from "./input-text-audio";
import { createClient } from "@/utils/supabase/client";
import TextBubble from "./text-bubble";

export default function AIChat(session){
  const supabase = createClient();
  const [student, setStudent] = useState(null);
  const [isloadingStudent, setIsLoadingStudent] = useState(true);
  const [chatSession, setChatSession] = useState(1);
  const [position, setPosition] = useState(0);
  const [lastResComplete, setLastResComplete] = useState(true);
  const [editLastMessage, setEditLastMessage] = useState(false);
  const [deletedMessage, setDeletedMessage] = useState(null);

  const {messages, input, handleInputChange, setMessages, handleSubmit,setInput, isLoading, error} = useChat({
    body:{
      student_id: session.user.id,
      session:chatSession,
      position:position,
    }
  }
  );

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

  const fetchData = async () => {
    try {
      if (student) {
        const lastMessages = await fetch(
          `/api/database/students/${session.user.id}/messages/current-session-bunch`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
        );
        const lastMessagesData = await lastMessages.json();

        if(lastMessagesData.length > 0){
          const last = lastMessagesData[lastMessagesData.length - 1];

          setChatSession(last.session);
          setPosition(last.position + 1);

          const newMessages = lastMessagesData.map(
            (item) =>
              ({
                id: item.id,
                role: item.sender == true ? 'user' :  'assistant',
                content: item.text
              })
          );

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

          setMessages([{
            role: "system",
            content:"Actúa como un psicólogo terapeútico cognitivo conductual llamado Calmbot, Calmbot es capaz de conversar con el usuario, y ser su psicólogo personalizado.\n" +
            " Procura seguir la conversación con el usuario naturalmente como un humano, utilizando técnicas de la terápia cognitiva conductual. Utiliza emojis en ocasiones que lo ameriten, muy cuidadosamente de no usarlos siempre, variados.\n" +
            " Recuerda NUNCA decirle que busque apoyo psicológico, dado que tu eres esa persona, TU ERES su apoyo psicológico. NO DIGAS TANTO 'estoy aquí para apoyarte' o similares\n" +
            " El usuario es un estudiante universitario, ten eso en cuenta.\n" +
            " Considera estas posibles actividades, si es que fuera a necesitar el usuario que le brindas alguna: \n" +
            shuffledActividades.join(", ") +
            "\n" +
            "considera esto sobre el usuario: \n" +
            "Su nombre es " + session.user.name + ". " + student.description,
          }, ...newMessages]);

        }else{
          setChatSession(1);
          setPosition(0);
          await handleAddMessage(
            "Hola, soy Calmbot, tu asistente psicológico personalizado ¿en qué puedo ayudarte hoy?",
            false
          );
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error appropriately, e.g., show an error message to the user
    }
  };

  const handleAddMessage = async (text, sender) => {
    try {
      const res = await fetch("/api/database/messages", {
        method: "POST",
        body: JSON.stringify({
          text: text,
          session: chatSession,
          position: position,
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
      setPosition(position + 1);

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

      setMessages([{
        role: "system",
        content:"Actúa como un psicólogo terapeútico cognitivo conductual llamado Calmbot, Calmbot es capaz de conversar con el usuario, y ser su psicólogo personalizado.\n" +
        " Procura seguir la conversación con el usuario naturalmente como un humano, utilizando técnicas de la terápia cognitiva conductual. Utiliza emojis en ocasiones que lo ameriten, muy cuidadosamente de no usarlos siempre, variados.\n" +
        " Recuerda NUNCA decirle que busque apoyo psicológico, dado que tu eres esa persona, TU ERES su apoyo psicológico. NO DIGAS TANTO 'estoy aquí para apoyarte' o similares\n" +
        " El usuario es un estudiante universitario, ten eso en cuenta.\n" +
        " Considera estas posibles actividades, si es que fuera a necesitar el usuario que le brindas alguna: \n" +
        shuffledActividades.join(", ") +
        "\n" +
        "considera esto sobre el usuario: \n" +
        "Su nombre es " + session.user.name + ". " + student.description,
      },{
        id: newMessageData.id,
        role: newMessageData.sender == true ? 'user' :  'assistant',
        content: newMessageData.text
      }]);
      
    } catch (error) {
      console.error(error);
    }
  };

  async function onClose() {
    console.log("Modal has closed");
    await handleStudent();
  }

  async function onOk() {
    console.log("Ok was clicked");
  }

  const customHandleSubmit = async (e) => {
    e.preventDefault();
    setLastResComplete(false);
    handleSubmit(e);
    setPosition(position + 2);
    setInput('');
  }

  const updateLastMessage = async () =>{
    const lastMessageResponse = await fetch(
      `/api/database/students/${session.user.id}/messages/last-message`
    );
    const lastMessageData = await lastMessageResponse.json();
    var lastMessage = messages[messages.length - 1];
    lastMessage.id = lastMessageData.id;

    messages[length - 1] = lastMessage;
    setMessages(messages);
    setEditLastMessage(false);
  }

  const handleNewAIMessage = async (payload) => {
    const { new: newMessage } = payload;

    if (newMessage.session === chatSession && !newMessage.sender && newMessage.position != 0 && position >= messages.length -1) {

      setEditLastMessage(true);
      setLastResComplete(true);
    }
  };

  const deleteMessage = async (index) => {
    const newMessages = messages;
    newMessages.splice(index, 1); // Remove the message from the array

    setMessages(newMessages);
    setDeletedMessage(index);
  };

  useEffect(() =>{
    if(editLastMessage){
      updateLastMessage();
    }
  },[editLastMessage, deletedMessage])

  useEffect(() => {
    if (student == null) {
      handleStudent();
    }
    fetchData();

    const messagesSubscription = supabase
    .channel('Message')
    .on('postgres_changes',{ event: 'INSERT', schema: 'public', table: 'Message', filter: `student_id=eq.${session.user.id}` } , handleNewAIMessage)
    .subscribe();


    return () => {
      messagesSubscription.unsubscribe();
    };
  }, [session, student, chatSession]);
 
  if (student == null && !isloadingStudent)
    return (
      <div className="grow">
        <ChatWelcome />
        <Dialog props={{title: "Student Information",type: "form",showDialog: true,width: "600px", onClose: onClose,onOk: onOk}}></Dialog>
      </div>
    );

  return(
    <div className="grow">
      <ChatWelcome />
      <div>
        <div className="h-5/6 mb-32">
          {messages
          .filter((message) => message.role === 'user' || message.role === 'assistant' )
          .map((message, index) => (
            <TextBubble
              key={index}
              chatMessage={message}
              onDelete={deleteMessage}
              messagesLength={messages.length}
              index={index}
              lastResComplete={lastResComplete}
            />
          ))}
        </div>
        <div className="w-full resize-none">
          <div className="fixed bottom-0 w-full bg-white">
            <div className="flex">
              <div className="w-2/3 pb-4 ml-20">                  
                <TextInput handleSubmit={customHandleSubmit} handleInputChange={handleInputChange} input={input} setInput={setInput}>                  
                </TextInput>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}