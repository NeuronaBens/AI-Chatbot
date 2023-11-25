import SidebarAdmin from "@/components/admin/sidebar";
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";

export default async function Layout({ children }) {

  return (
    <ChakraProvider>
      <SidebarAdmin>
        {children}
      </SidebarAdmin>
    </ChakraProvider>
  );
}
