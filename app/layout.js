import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/general/navbar";
import NavbarContent from "@/components/general/navbar-content";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Chatbot",
  description:
    "Empieza la indentificación y prevención del estrés y la ansiedad con nuestro AI Chatbot",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Navbar>
          <NavbarContent></NavbarContent>
        </Navbar>
        {children}
      </body>
    </html>
  );
}

//this should be if authenticated as user, navbar with navbarx, if authenticated with admin navar with navbary, etc.
