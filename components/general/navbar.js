"use client";

import Link from "next/link";
import Logo from "./logo";
import { Children } from "react";

function Navbar({ children }) {
  return (
    <nav className="bg-white shadow-lg py-4">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between w-full">
        <Logo size={40} />
        {children}
      </div>
    </nav>
  );
}

export default Navbar;
