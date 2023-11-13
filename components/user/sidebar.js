"use client"
import React from "react";
import Link from "next/link";
import Logo from "../general/logo";
import UserProfile from "../general/profile";
import { useState,useEffect } from "react";

const SidebarUser =  ({session,children}) => {
  const [closed, setClosed] = useState(false);
  function toggle() {
    setClosed(!closed);
  }

  return (
    <div className="flex">
      <div
      className={
        closed ? " fixed z-50 h-screen bg-gray-200 " : "fixed shadow-lg h-screen bg-gray-200 z-50 "
      }
    >
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
            onClick={()=>toggle()}
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
          <Link href="/user">
            <p className="m-4">
              <b>Chat</b>
            </p>
          </Link>
          <Link href="/user/historial">
            <p className="m-4">Historial</p>
          </Link>
          <Link href="/user/marcadores">
            <p className="m-4">Marcadores</p>
          </Link>
          <Link href="/user/tests">
            <p className="m-4">Tests</p>
          </Link>
          <Link href="/user/notificaciones">
            <p className="m-4">Notificaciones</p>
          </Link>
          <Link href="/user/ayuda">
            <p className="m-4">Ayuda</p>
          </Link>
        </div>
      )}
      {!closed && (
        <div >
          <UserProfile {...session}></UserProfile>
        </div>
      )}
    </div>
    <div className={closed?"w-11/12 ml-auto" : "w-10/12 ml-auto"}>
      {children}
    </div>
    </div>
    
  );
};

export default SidebarUser;
