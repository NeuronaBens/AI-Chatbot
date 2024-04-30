"use client";
import React from "react";
import Link from "next/link";
import Logo from "../general/logo";
import UserProfile from "../general/profile";
import { useState } from "react";

const SidebarAdmin = ({ children }) => {
  const [closed, setClosed] = useState(false);
  const [tables, setTables] = useState(false);
  const [notificaciones, setNotificaciones] = useState(false);
  const [complaints, setComplaints] = useState(true);
  const [showTables, setShowTables] = useState(false);
  const [tableStudents, setTableStudents] = useState(false);
  const [tableMessages, setTableMessages] = useState(false);
  const [tableAnxiety, setTableAnxiety] = useState(false);
  const [tableStress, setTableStress] = useState(false);
  const [tableComplaints, setTableComplaints] = useState(false);
  const [tableTasks, setTableTasks] = useState(false);
  const [tableStudentsTasks, setTableStudentsTasks] = useState(false);
  const [tableCareers, setTableCareers] = useState(false);
  const [tableSexes, setTableSexes] = useState(false);

  function toggle() {
    setClosed(!closed);
  }

  const setAllFalse = () => {
    setTables(false);
    setNotificaciones(false);
    setComplaints(false);
    setShowTables(false);
    setTableStudents(false);
    setTableMessages(false);
    setTableAnxiety(false);
    setTableStress(false);
    setTableComplaints(false);
    setTableTasks(false);
    setTableStudentsTasks(false);
    setTableCareers(false);
    setTableSexes(false);
  };

  const handleOptionClick = (option) => {
    setAllFalse();
    if (option == "Tables") {
      setTables(true);
    } else if (option == "Notificaciones") {
      setNotificaciones(true);
    } else if (option == "Complaints") {
      setComplaints(true);
    } else if (option == "Students") {
      setTables(true);
      setTableStudents(true);
    } else if (option == "Messages") {
      setTables(true);
      setTableMessages(true);
    } else if (option == "Anxiety") {
      setTables(true);
      setTableAnxiety(true);
    } else if (option == "Stress") {
      setTables(true);
      setTableStress(true);
    } else if (option == "ComplaintsTable") {
      setTables(true);
      setTableComplaints(true);
    } else if (option == "Tasks") {
      setTables(true);
      setTableTasks(true);
    } else if (option == "StudentsTasks") {
      setTables(true);
      setTableStudentsTasks(true);
    } else if (option == "Careers") {
      setTables(true);
      setTableCareers(true);
    } else if (option == "Sexes") {
      setTables(true);
      setTableSexes(true);
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
            <div className="mx-4">
              <Logo size={40} />
            </div>
          </Link>
          <div className="flex ml-auto mr-4">
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
            <Link href="/admin" onClick={() => handleOptionClick("Complaints")}>
              <p
                className={`p-2 mx-2 my-1 rounded ${
                  complaints
                    ? "bg-[#7471D9] hover:bg-[#7471D9]"
                    : "hover:bg-[#7471D9]"
                }`}
              >
                Complaints
              </p>
            </Link>
            <Link
              href="/admin/notificaciones"
              onClick={() => handleOptionClick("Notificaciones")}
            >
              <p
                className={`p-2 mx-2 my-1 rounded ${
                  notificaciones
                    ? "bg-[#7471D9] hover:bg-[#7471D9]"
                    : "hover:bg-[#7471D9]"
                }`}
              >
                Notificaciones
              </p>
            </Link>
            <div>
              <button
                className="w-full"
                onClick={() => {
                  setShowTables(!showTables);
                }}
              >
                <p
                  className={`p-2 mx-2 my-1 rounded text-left flex items-center ${
                    tables
                      ? "bg-[#7471D9] hover:bg-[#7471D9]"
                      : "hover:bg-[#7471D9]"
                  }`}
                >
                  <b>Tables</b>
                  <svg
                    class="w-3 h-3 ml-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </p>
              </button>
              {showTables && (
                <ul class="text-sm ml-4">
                  <li>
                    <Link
                      href="/admin/tables/students-table"
                      onClick={() => handleOptionClick("Students")}
                    >
                      <p
                        className={`p-1 m-1 rounded ${
                          tableStudents
                            ? "bg-[#7471D9] hover:bg-[#7471D9]"
                            : "hover:bg-[#7471D9]"
                        }`}
                      >
                        Students Table
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/tables/messages-table"
                      onClick={() => handleOptionClick("Messages")}
                    >
                      <p
                        className={`p-1 m-1 rounded ${
                          tableMessages
                            ? "bg-[#7471D9] hover:bg-[#7471D9]"
                            : "hover:bg-[#7471D9]"
                        }`}
                      >
                        Messages Table
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/tables/anxiety-table"
                      onClick={() => handleOptionClick("Anxiety")}
                    >
                      <p
                        className={`p-1 m-1 rounded ${
                          tableAnxiety
                            ? "bg-[#7471D9] hover:bg-[#7471D9]"
                            : "hover:bg-[#7471D9]"
                        }`}
                      >
                        Anxiety Levels Table
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/tables/stress-table"
                      onClick={() => handleOptionClick("Stress")}
                    >
                      <p
                        className={`p-1 m-1 rounded ${
                          tableStress
                            ? "bg-[#7471D9] hover:bg-[#7471D9]"
                            : "hover:bg-[#7471D9]"
                        }`}
                      >
                        Stress Levels Table
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/tables/complaints-table"
                      onClick={() => handleOptionClick("ComplaintsTable")}
                    >
                      <p
                        className={`p-1 m-1 rounded ${
                          tableComplaints
                            ? "bg-[#7471D9] hover:bg-[#7471D9]"
                            : "hover:bg-[#7471D9]"
                        }`}
                      >
                        Complaints Table
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/tables/tasks-table"
                      onClick={() => handleOptionClick("Tasks")}
                    >
                      <p
                        className={`p-1 m-1 rounded ${
                          tableTasks
                            ? "bg-[#7471D9] hover:bg-[#7471D9]"
                            : "hover:bg-[#7471D9]"
                        }`}
                      >
                        Tasks Table
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/tables/students-tasks-table"
                      onClick={() => handleOptionClick("StudentsTasks")}
                    >
                      <p
                        className={`p-1 m-1 rounded ${
                          tableStudentsTasks
                            ? "bg-[#7471D9] hover:bg-[#7471D9]"
                            : "hover:bg-[#7471D9]"
                        }`}
                      >
                        Students Tasks Table
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/tables/careers-table"
                      onClick={() => handleOptionClick("Careers")}
                    >
                      <p
                        className={`p-1 m-1 rounded ${
                          tableCareers
                            ? "bg-[#7471D9] hover:bg-[#7471D9]"
                            : "hover:bg-[#7471D9]"
                        }`}
                      >
                        Careers Table
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/tables/sexes-table"
                      onClick={() => handleOptionClick("Sexes")}
                    >
                      <p
                        className={`p-1 m-1 rounded ${
                          tableSexes
                            ? "bg-[#7471D9] hover:bg-[#7471D9]"
                            : "hover:bg-[#7471D9]"
                        }`}
                      >
                        Sexes Table
                      </p>
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        )}
        {!closed && (
          <div className="mt-16 md:mt-24">
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
