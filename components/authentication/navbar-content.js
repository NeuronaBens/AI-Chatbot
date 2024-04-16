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
    <div className="flex items-center justify-between text-white">
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
          isOpen ? "block" : "hidden"
        } md:flex items-center space-x-2`}
      >
        <Link href="/user">
          <p className="p-4 rounded hover:bg-[#7471D9]">
            <b>Chat</b>
          </p>
        </Link>
        <Link href="#inicio">
          <p className="p-4 rounded hover:bg-[#7471D9]">Inicio</p>
        </Link>
        <Link href="#funcionalidades">
          <p className="p-4 rounded hover:bg-[#7471D9]">Funcionalidades</p>
        </Link>
        <Link href="#como">
          <p className="p-4 rounded hover:bg-[#7471D9]">Como Funciona</p>
        </Link>
        <Link href="#enfoque">
          <p className="p-4 rounded hover:bg-[#7471D9]">Nuestro Enfoque</p>
        </Link>
        <Link href="#contacto">
          <p className="p-4 rounded hover:bg-[#7471D9]">Contacto</p>
        </Link>
        <Link href="/general/register">
          <p className="p-4 rounded hover:bg-[#7471D9]">Registro</p>
        </Link>
        <Link href="/general/login">
          <p className="p-4 rounded hover:bg-[#7471D9]">Login</p>
        </Link>
      </div>
    </div>
  );
};

export default NavbarContentAuthentication;
