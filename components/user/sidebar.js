"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "../general/logo";
import UserProfile from "../general/profile";
import { createClient } from "@/utils/supabase/client";

const SidebarUser = ({ children, session }) => {
  const supabase = createClient();
  const [closed, setClosed] = useState(false);
  const [optionMenu, setOptionMenu] = useState("");
  const [theme, setTheme] = useState("Claro");
  const [newNoti, setNewNot] = useState(false);
  const [readNoti, setReadNot] = useState(false);
  const [numNoti, setNumNoti] = useState(-1);

  const addNoti = (payload) => {
    if (payload.eventType == "INSERT") {
      setNewNot(true);
    } else if (payload.eventType == "UPDATE") {
      setReadNot(true);
    }
  };

  useEffect(() => {
    const fetchTheme = async () => {
      setClosed(window.innerWidth < 768);
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

    const fetchNumNoti = async () => {
      try {
        if (session && session.user) {
          const response = await fetch(
            `/api/database/students/${session.user.id}/notifications/count`
          );
          const data = await response.json();
          setNumNoti(data.id);
        }
      } catch (error) {
        console.error("Error fetching theme:", error);
      }
    };

    fetchNumNoti();
    fetchTheme();

    const storedOption = sessionStorage.getItem("optionMenu");

    if (storedOption !== null) {
      setOptionMenu(storedOption);
    } else {
      setOptionMenu("chat");
    }
  }, [session]);

  useEffect(() => {
    if (newNoti == true) {
      setNumNoti(numNoti + 1);
      setNewNot(false);
    } else if (readNoti == true) {
      setNumNoti(numNoti - 1);
      setReadNot(false);
    }

    const notisSubscription = supabase
      .channel("StudentNotification")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "StudentNotification",
          filter: `student_id=eq.${session.user.id}`,
        },
        addNoti
      )
      .subscribe();

    return () => {
      notisSubscription.unsubscribe();
    };
  }, [newNoti, readNoti]);

  function toggle() {
    setClosed(!closed);
  }

  const handleOptionClick = (option) => {
    setOptionMenu(option);
    sessionStorage.setItem("optionMenu", option);
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
        className={`${
          closed
            ? "w-[0%] md:w-[7.5%] transition-all duration-200 ease-in-out"
            : "w-[43%] md:w-[11.5%] transition-all duration-200 ease-in-out shadow-lg"
        } text-white fixed z-50 h-screen bg-[#3A378C]`}
      >
        <div className="h-1/4 flex">
          <Link href="/">
            <div className="m-4">
              <Logo size={40} />
            </div>
          </Link>
        </div>
        {!closed && (
          <div className="h-2/4">
            <Link
              href="/user"
              onClick={() => {
                handleOptionClick("chat");
                if (window.innerWidth < 768) setClosed(!closed);
              }}
            >
              <p
                className={`p-2 m-2 rounded hover:bg-[#7471D9] ${
                  optionMenu == "chat" ? "bg-[#7471D9]" : ""
                }`}
              >
                <b>Chat</b>
              </p>
            </Link>
            <Link
              href="/user/historial"
              onClick={() => {
                handleOptionClick("historial");
                if (window.innerWidth < 768) setClosed(!closed);
              }}
            >
              <p
                className={`p-2 m-2 rounded hover:bg-[#7471D9] ${
                  optionMenu == "historial" ? "bg-[#7471D9]" : ""
                }`}
              >
                Historial
              </p>
            </Link>
            <Link
              href="/user/marcadores"
              onClick={() => {
                handleOptionClick("marcadores");
                if (window.innerWidth < 768) setClosed(!closed);
              }}
            >
              <p
                className={`p-2 m-2 rounded hover:bg-[#7471D9] ${
                  optionMenu == "marcadores" ? "bg-[#7471D9]" : ""
                }`}
              >
                Marcadores
              </p>
            </Link>
            <Link
              href="/user/tests"
              onClick={() => {
                handleOptionClick("tests");
                if (window.innerWidth < 768) setClosed(!closed);
              }}
            >
              <p
                className={`p-2 m-2 rounded hover:bg-[#7471D9] ${
                  optionMenu == "tests" ? "bg-[#7471D9]" : ""
                }`}
              >
                Tests
              </p>
            </Link>
            <Link
              href="/user/notificaciones"
              onClick={() => {
                handleOptionClick("notificaciones");
                if (window.innerWidth < 768) setClosed(!closed);
              }}
            >
              <div
                className={`p-2 m-2 rounded flex flex-row items-center hover:bg-[#7471D9] ${
                  optionMenu == "notificaciones" ? "bg-[#7471D9]" : ""
                }`}
              >
                <p>Notificaciones</p>
                {numNoti > 0 && (
                  <div className="rounded-full ml-2 bg-red-600 text-center text-sm w-6 h-6">
                    {numNoti}
                  </div>
                )}
              </div>
            </Link>
            <Link
              href="/user/actividades"
              onClick={() => {
                handleOptionClick("actividades");
                if (window.innerWidth < 768) setClosed(!closed);
              }}
            >
              <p
                className={`p-2 m-2 rounded hover:bg-[#7471D9] ${
                  optionMenu == "actividades" ? "bg-[#7471D9]" : ""
                }`}
              >
                Actividades
              </p>
            </Link>
            <Link
              href="/user/ayuda"
              onClick={() => {
                handleOptionClick("ayuda");
                if (window.innerWidth < 768) setClosed(!closed);
              }}
            >
              <p
                className={`p-2 m-2 rounded hover:bg-[#7471D9] ${
                  optionMenu == "ayuda" ? "bg-[#7471D9]" : ""
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
