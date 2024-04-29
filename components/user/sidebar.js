"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "../general/logo";
import UserProfile from "../general/profile";

const SidebarUser = ({ children, session }) => {
  const [closed, setClosed] = useState(false);
  const [chat, setChat] = useState(true);
  const [historial, setHistorial] = useState(false);
  const [marcadores, setMarcadores] = useState(false);
  const [tests, setTests] = useState(false);
  const [notificaciones, setNotificaciones] = useState(false);
  const [actividades, setActividades] = useState(false);
  const [ayuda, setAyuda] = useState(false);
  const [theme, setTheme] = useState("Claro");

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        if (session && session.user) {
          const userId = session.user.id;
          const response = await fetch(
            `/api/database/students/${userId}/settings`
          );
          const data = await response.json();

          setTheme(data.theme);

          // Set the background color based on the theme
          if (data.theme === "Oscuro") {
            document.body.className = "bg-gray-800";
          }
        }
      } catch (error) {
        console.error("Error fetching theme:", error);
      }
    };

    fetchTheme();
  }, [session]);

  function toggle() {
    setClosed(!closed);
  }

  const setAllFalse = () => {
    setChat(false);
    setHistorial(false);
    setMarcadores(false);
    setTests(false);
    setNotificaciones(false);
    setActividades(false);
    setAyuda(false);
  };

  const handleOptionClick = (option) => {
    setAllFalse();
    if (option == "chat") {
      setChat(true);
    } else if (option == "historial") {
      setHistorial(true);
    } else if (option == "marcadores") {
      setMarcadores(true);
    } else if (option == "tests") {
      setTests(true);
    } else if (option == "notificaciones") {
      setNotificaciones(true);
    } else if (option == "actividades") {
      setActividades(true);
    } else if (option == "ayuda") {
      setAyuda(true);
    }
  };

  return (
    <div
      className={`flex ${
        theme === "Oscuro" ? "bg-gray-800 text-white" : " text-black"
      }`}
    >
      <div
        className={`${
          closed
            ? "left-4 md:left-20 text-black md:text-white"
            : "left-32 text-white"
        } fixed top-4 z-[100]`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-6 h-6 cursor-pointer ${
            closed ? "transform rotate-180" : ""
          }`}
          onClick={() => toggle()}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
          />
        </svg>
      </div>
      <div
        className={
          closed
            ? "md:w-[7.5%] text-white fixed z-50 h-screen bg-[#3A378C] "
            : "md:w-[11.5%] text-white fixed shadow-lg h-screen bg-[#3A378C] z-50"
        }
      >
        <div className="h-1/4 flex">
          <Link href="/" className={closed ? "hidden md:block" : ""}>
            <div className="m-4">
              <Logo size={40} />
            </div>
          </Link>
        </div>
        {!closed && (
          <div className="h-2/4">
            <Link href="/user" onClick={() => handleOptionClick("chat")}>
              <p
                className={`p-2 m-2 rounded ${
                  chat
                    ? "bg-[#7471D9] hover:bg-[#7471D9]"
                    : "hover:bg-[#7471D9]"
                }`}
              >
                <b>Chat</b>
              </p>
            </Link>
            <Link
              href="/user/historial"
              onClick={() => handleOptionClick("historial")}
            >
              <p
                className={`p-2 m-2 rounded ${
                  historial
                    ? "bg-[#7471D9] hover:bg-[#7471D9]"
                    : "hover:bg-[#7471D9]"
                }`}
              >
                Historial
              </p>
            </Link>
            <Link
              href="/user/marcadores"
              onClick={() => handleOptionClick("marcadores")}
            >
              <p
                className={`p-2 m-2 rounded ${
                  marcadores
                    ? "bg-[#7471D9] hover:bg-[#7471D9]"
                    : "hover:bg-[#7471D9]"
                }`}
              >
                Marcadores
              </p>
            </Link>
            <Link href="/user/tests" onClick={() => handleOptionClick("tests")}>
              <p
                className={`p-2 m-2 rounded ${
                  tests
                    ? "bg-[#7471D9] hover:bg-[#7471D9]"
                    : "hover:bg-[#7471D9]"
                }`}
              >
                Tests
              </p>
            </Link>
            <Link
              href="/user/notificaciones"
              onClick={() => handleOptionClick("notificaciones")}
            >
              <p
                className={`p-2 m-2 rounded ${
                  notificaciones
                    ? "bg-[#7471D9] hover:bg-[#7471D9]"
                    : "hover:bg-[#7471D9]"
                }`}
              >
                Notificaciones
              </p>
            </Link>
            <Link
              href="/user/actividades"
              onClick={() => handleOptionClick("actividades")}
            >
              <p
                className={`p-2 m-2 rounded ${
                  actividades
                    ? "bg-[#7471D9] hover:bg-[#7471D9]"
                    : "hover:bg-[#7471D9]"
                }`}
              >
                Actividades
              </p>
            </Link>
            <Link href="/user/ayuda" onClick={() => handleOptionClick("ayuda")}>
              <p
                className={`p-2 m-2 rounded ${
                  ayuda
                    ? "bg-[#7471D9] hover:bg-[#7471D9]"
                    : "hover:bg-[#7471D9]"
                }`}
              >
                Ayuda
              </p>
            </Link>
          </div>
        )}
        {!closed && (
          <div className="mt-16">
            <UserProfile></UserProfile>
          </div>
        )}
      </div>
      <div className={closed ? "md:w-11/12 ml-auto" : "md:w-10/12 ml-auto"}>
        {children}
      </div>
    </div>
  );
};

export default SidebarUser;
