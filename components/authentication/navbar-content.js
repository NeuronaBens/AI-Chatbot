import React from "react";
import Link from "next/link";

const NavbarContentAuthentication = () => {
  return (
    <div className="flex items-center">
      <Link href="/chat">
        <p className="ml-4">
          <b>Chat</b>
        </p>
      </Link>
      <Link href="/register">
        <p className="ml-4">Register</p>
      </Link>
      <Link href="/login">
        <p className="ml-4">Login</p>
      </Link>
      <Link href="/ayuda">
        <p className="ml-4">Ayuda</p>
      </Link>
      <Link href="/contacto">
        <p className="ml-4">Contacto</p>
      </Link>
    </div>
  );
};

export default NavbarContentAuthentication;
