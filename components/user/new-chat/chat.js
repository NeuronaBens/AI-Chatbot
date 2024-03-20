"use client";

import {useChat} from "ai/react"
import React, { useState, useEffect } from "react";
import ChatWelcome from "../chat/chat-welcome";
import Dialog from "@/components/general/modal";
import { TaskManager } from "@/utils/TaskManager";

export default function AIChat(session){

  const [student, setStudent] = useState(null);
  const [isloadingStudent, setIsLoadingStudent] = useState(true);
  const [chatSession, setChatSession] = useState(1);
  const [position, setPosition] = useState(0);

  const {messages, input, handleInputChange, setMessages, handleSubmit,setInput, isLoading, error} = useChat({
    body:{
      student_id: session.user.id,
      session:chatSession,
      position:position,
    },
    initialMessages:[]
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
        const lastMessageResponse = await fetch(
          `/api/database/students/${session.user.id}/messages/last-message`
        );
        const lastMessageData = await lastMessageResponse.json();
        if (lastMessageData) {
          setChatSession(lastMessageData.session);
          setPosition(lastMessageData.position + 1);
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
               ({
                id: item.id,
                role: item.sender == true ? 'user' :  'assistant',
                content: item.text
              })
          );
          setMessages([{
            role: "system",
            content:"Actúa como un psicólogo terapeútico llamado Calmbot, Calmbot es capaz de conversar con el usuario, y ser su psicólogo personalizado," +
            " además brinda tecnicas de diferente tipo para tratar sus problemas de estrés y ansiedad. \n" +
            " Tambien procura ser asertivo y seguir la conversación con el usuario," +
            " utilizando técnicas de la terápia cognitiva conductual." +
            " Recuerda NUNCA decirle que busque apoyo psicológico, dado que tu eres esa persona, TU ERES su apoyo psicológico. \n" +
            " Se una persona bastante llevadera y jovial para ayudar a la mejoría psicológica del estrés o ansiedad que pueda estar sufriendo el este paciente. \n" +
            " Usa respuestas CORTAS o MEDIANAS, no te excedas con la longitud de las respuestas, no uses enumeraciones, debe ser una conversición jovial.\n" +
            " Si es que el usuario muestra algún indicio de ansiedad o estrés, preguntale si quiere que le brindes algún ejercicio de relajación o algún mecanismo para calmarse.\n" +
            " El usuario es un estudiante universitario, ten eso en cuenta.\n" +
            "considera estas posibles actividades, si es que fuera a necesitar el usuario que le brindas alguna: [Respiración profunda, Meditación, Ejercicio físico, Escucha música relajante, Práctica de mindfulness, Escritura terapéutica, Socializar y buscar apoyo] \n" +
            "considera esto sobre el usuario: \n" +
            "Mi nombre es " + session.user.name + ". " + student.description,
          }, ...newMessages]);
        } else {
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
      
      setMessages([{
        role: "system",
        content:"Actúa como un psicólogo terapeútico llamado Calmbot, Calmbot es capaz de conversar con el usuario, y ser su psicólogo personalizado," +
        " además brinda tecnicas de diferente tipo para tratar sus problemas de estrés y ansiedad. \n" +
        " Tambien procura ser asertivo y seguir la conversación con el usuario," +
        " utilizando técnicas de la terápia cognitiva conductual." +
        " Recuerda NUNCA decirle que busque apoyo psicológico, dado que tu eres esa persona, TU ERES su apoyo psicológico. \n" +
        " Se una persona bastante llevadera y jovial para ayudar a la mejoría psicológica del estrés o ansiedad que pueda estar sufriendo el este paciente. \n" +
        " Usa respuestas CORTAS o MEDIANAS, no te excedas con la longitud de las respuestas, no uses enumeraciones, debe ser una conversición jovial.\n" +
        " Si es que el usuario muestra algún indicio de ansiedad o estrés, preguntale si quiere que le brindes algún ejercicio de relajación o algún mecanismo para calmarse.\n" +
        " El usuario es un estudiante universitario, ten eso en cuenta.\n" +
        "considera estas posibles actividades, si es que fuera a necesitar el usuario que le brindas alguna: [Respiración profunda, Meditación, Ejercicio físico, Escucha música relajante, Práctica de mindfulness, Escritura terapéutica, Socializar y buscar apoyo] \n" +
        "considera esto sobre el usuario: \n" +
        "Mi nombre es " + session.user.name + ". " + student.description,
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

  const modalProps = {
    title: "Student Information",
    type: "form",
    showDialog: true,
    width: "600px",
    onClose: onClose,
    onOk: onOk,
  };

  const customHandleSubmit = async (e) => {
    e.preventDefault();
    handleSubmit(e);
    setPosition(position + 2);
    setInput('');
  }

  useEffect(() => {
    if (student == null) {
      handleStudent();
    }
    fetchData();
  }, [session, student, chatSession]);


  if (student == null && !isloadingStudent)
    return (
      <div className="grow">
        <ChatWelcome />
        <Dialog props={modalProps}></Dialog>
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
            <div className="w-5/6 mx-auto relative">
              <div key={index} className={`w-2/3 rounded-xl my-2 mx-5 px-4 py-2 
              ${message.role === 'assistant' ? "bg-[#7471D9] text-white mr-auto" : "bg-gray-300 ml-auto"} flex justify-between items-center`}>
                <p>{message.content}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full resize-none">
          <div className="fixed bottom-0 w-full bg-white">
            <div className="flex">
              <div className="w-2/3">                  
                <form onSubmit={customHandleSubmit} className="p-5 flex">
                  <input type="text" value={input} onChange={handleInputChange} 
                    className="w-full mr-2 p-2 rounded-l bg-gray-200 " placeholder="Escribe un mensaje"/>
                  <button className="bg-[#3A378C] text-white rounded-r p-2" type='submit'>{"➤"}</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}