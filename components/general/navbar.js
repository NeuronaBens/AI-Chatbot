"use client";

import Link from "next/link";
import Logo from "./logo";
import { Children } from "react";

function Navbar({ children }) {
  return (
    <nav className="pb-4">
      <div className="max-w-full mx-auto px-4 flex items-center justify-between px-10">
        <Link href="/">
          <Logo size={40} />
        </Link>
        {children}
      </div>
    </nav>
  );
}

export default Navbar;
