"use client";
import React from "react";
import Link from "next/link";
import Logo from "../general/logo";
import UserProfile from "../general/profile";
import { useState } from "react";

const SidebarAdmin = ({ children }) => {
  const [closed, setClosed] = useState(false);
  const [dashboards, setDashboards] = useState(true);
  const [notificaciones, setNotificaciones] = useState(false);
  const [complaints, setComplaints] = useState(false);
  function toggle() {
    setClosed(!closed);
  }

  const setAllFalse = () => {
    setDashboards(false);
    setNotificaciones(false);
    setComplaints(false);
  };

  const handleOptionClick = (option) => {
    setAllFalse();
    if (option == "Dashboards") {
      setDashboards(false);
    } else if (option == "Notificaciones") {
      setNotificaciones(false);
    } else if (option == "Complaints") {
      setComplaints(false);
    }
  };

  return (
    <div className="flex">
      <div
        className={
          closed
            ? "text-white fixed z-50 h-screen bg-[#3A378C] "
            : "text-white fixed shadow-lg h-screen bg-[#3A378C] z-50 "
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
              onClick={() => toggle()}
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
            <Link href="/admin" onClick={() => handleOptionClick("Dashboards")}>
              <p
                className={`p-2 m-2 rounded ${
                  dashboards
                    ? "bg-[#7471D9] hover:bg-[#7471D9]"
                    : "hover:bg-[#7471D9]"
                }`}
              >
                <b>Dashboards</b>
              </p>
            </Link>
            <Link
              href="/admin/notificaciones"
              onClick={() => handleOptionClick("Notificaciones")}
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
              href="/admin/complaints"
              onClick={() => handleOptionClick("Complaints")}
            >
              <p
                className={`p-2 m-2 rounded ${
                  complaints
                    ? "bg-[#7471D9] hover:bg-[#7471D9]"
                    : "hover:bg-[#7471D9]"
                }`}
              >
                Complaints
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
      <div className={closed ? "w-11/12 ml-auto" : "w-10/12 ml-auto"}>
        {children}
      </div>
    </div>
  );
};

export default SidebarAdmin;
