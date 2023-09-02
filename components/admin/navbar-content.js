import React from "react";
import Link from "next/link";

const NavbarContentAdmin = () => {
  return (
    <div className="flex items-center">
      <Link href="/dashboards">
        <p className="mx-4">Dashboards</p>
      </Link>
      <Link href="/enviar-notificaciones">
        <p>Notificaciones</p>
      </Link>
    </div>
  );
};

export default NavbarContentAdmin;
