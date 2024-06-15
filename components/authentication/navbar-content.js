"use client";

import React, { useState } from "react";
import Link from "next/link";

const NavbarContentAuthentication = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the hamburger menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex items-center justify-between text-[#261039]">
      {/* Hamburger Icon */}
      <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </div>

      {/* Navigation Links */}
      <div
        className={`${
          isOpen ? "flex flex-col p-2 space-y-2 md:hidden" : "hidden"
        } md:flex md:items-center md:space-x-2`}
      >
        <Link href="/user">
          <button
            className="p-4 rounded hover:bg-[#7471D9]"
            onClick={() => setIsOpen(false)}
          >
            <b>Chat</b>
          </button>
        </Link>
        <Link href="#inicio">
          <button
            className="p-4 rounded hover:bg-[#7471D9]"
            onClick={() => setIsOpen(false)}
          >
            Inicio
          </button>
        </Link>
        <Link href="#funcionalidades">
          <button
            className="p-4 rounded hover:bg-[#7471D9]"
            onClick={() => setIsOpen(false)}
          >
            Funcionalidades
          </button>
        </Link>
        <Link href="#informacion">
          <button
            className="p-4 rounded hover:bg-[#7471D9]"
            onClick={() => setIsOpen(false)}
          >
            Información
          </button>
        </Link>
        <Link href="#descargar">
          <button
            className="p-4 rounded hover:bg-[#7471D9]"
            onClick={() => setIsOpen(false)}
          >
            Descargar
          </button>
        </Link>
        <Link href="/general/register">
          <button
            className="p-4 rounded hover:bg-[#7471D9]"
            onClick={() => setIsOpen(false)}
          >
            Registro
          </button>
        </Link>
        <Link href="/general/login">
          <button
            className="p-4 rounded hover:bg-[#7471D9]"
            onClick={() => setIsOpen(false)}
          >
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NavbarContentAuthentication;
