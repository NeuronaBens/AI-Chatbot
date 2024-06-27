import Link from "next/link";
import Logo from "./logo";

function Navbar({ children }) {
  return (
    <nav className="pb-4">
      {/* Background gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-[#FFFFFF] z-[-1]"></div>
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
