import React from "react";
import Link from "next/link";

const NavbarContentAuthentication = () => {
  return (
    <div className="flex items-center space-x-2 text-white">
      <Link href="/user">
        <p className="p-4 rounded hover:bg-[#7471D9]">
          <b>Chat</b>
        </p>
      </Link>
      <Link href="#incio">
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
  );
};

export default NavbarContentAuthentication;
