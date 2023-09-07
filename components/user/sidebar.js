"use client";

import React from "react";
import Link from "next/link";
import Logo from "../general/logo";
import { useState } from "react";

const SidebarUser = () => {
  const [closed, setClosed] = useState(false);

  function toggle() {
    setClosed(!closed);
  }

  return (
    <div className={closed ? "fixed" : "fixed shadow-lg h-screen"}>
      <div className="h-1/4 flex">
        <Link href="/">
          <div className="m-4">
            <Logo size={40} />
          </div>
        </Link>
        <div className="flex ml-auto mr-4 mt-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-6 h-6 cursor-pointer ${
              closed ? "transform rotate-180" : ""
            }`}
            onClick={toggle}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
            />
          </svg>
        </div>
      </div>
      {!closed && (
        <div className="h-2/4">
          <Link href="/user/chat">
            <p className="m-4">
              <b>Chat</b>
            </p>
          </Link>
          <Link href="/user/ayuda">
            <p className="m-4">Ayuda</p>
          </Link>
          <Link href="/user/marcadores">
            <p className="m-4">Marcadores</p>
          </Link>
          <Link href="/user/notificaciones">
            <p className="m-4">Notificaciones</p>
          </Link>
          <Link href="/user/configuracion">
            <p className="m-4">Configuración</p>
          </Link>
        </div>
      )}
      {!closed && (
        <div className="h-1/4">
          <Link href="/user/cerrar-sesion">
            <p className="m-4 text-gray-400 flex">
              Cerrar Sesion{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 ml-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
            </p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default SidebarUser;
