import SidebarAdmin from "@/components/admin/sidebar";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";

export default async function Layout({ children }) {
  return (
    <ChakraProvider>
      <SidebarAdmin>{children}</SidebarAdmin>
    </ChakraProvider>
  );
}
