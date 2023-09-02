import React from "react";
import Link from "next/link";

const NavbarContentUser = () => {
  return (
    <div className="flex items-center">
      <Link href="/chat">
        <p className="ml-4">
          <b>Chat</b>
        </p>
      </Link>
      <Link href="/ayuda">
        <p className="ml-4">Ayuda</p>
      </Link>
      <Link href="/marcadores">
        <p className="ml-4">Marcadores</p>
      </Link>
      <Link href="/notificaciones">
        <p className="ml-4">Notificaciones</p>
      </Link>
      <Link href="/configuracion">
        <p className="ml-4">Configuración</p>
      </Link>
      <Link href="/cerrar-sesion">
        <p className="ml-4 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
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
  );
};

export default NavbarContentUser;
