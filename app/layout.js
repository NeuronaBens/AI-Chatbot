import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Calmy",
  description:
    "Empieza la indentificación y prevención del estrés y la ansiedad con nuestro AI Chatbot",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <Providers>
        <body>{children}</body>
      </Providers>
    </html>
  );
}

//this should be if authenticated as user, navbar with navbarx, if authenticated with admin navar with navbary, etc.
