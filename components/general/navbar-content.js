import React from "react";
import Link from "next/link";

const NavbarContent = () => {
  return (
    <div className="flex items-center">
      <Link href="/about">
        <p className="mx-4">Ayuda</p>
      </Link>
      <Link href="/contact">
        <p>Contacto</p>
      </Link>
    </div>
  );
};

export default NavbarContent;
