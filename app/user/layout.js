import SidebarUser from "@/components/user/sidebar";
import { ChakraProvider } from "@chakra-ui/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Layout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <ChakraProvider>
      <SidebarUser session={session}>{children}</SidebarUser>
    </ChakraProvider>
  );
}
