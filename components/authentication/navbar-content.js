import React from "react";
import Link from "next/link";

const NavbarContentAuthentication = () => {
  return (
    <div className="flex items-center">
      <Link href="/general/chat">
        <p className="ml-4">
          <b>Chat</b>
        </p>
      </Link>
      <Link href="/general/register">
        <p className="ml-4">Register</p>
      </Link>
      <Link href="/general/login">
        <p className="ml-4">Login</p>
      </Link>
      <Link href="/general/ayuda">
        <p className="ml-4">Ayuda</p>
      </Link>
      <Link href="/general/contacto">
        <p className="ml-4">Contacto</p>
      </Link>
    </div>
  );
};

export default NavbarContentAuthentication;
