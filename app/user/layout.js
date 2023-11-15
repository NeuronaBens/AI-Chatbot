import SidebarUser from "@/components/user/sidebar";
import { ChakraProvider } from '@chakra-ui/react'

export default async function Layout({ children }) {
  return (
    <ChakraProvider>
      <SidebarUser>
        {children}
      </SidebarUser>
    </ChakraProvider>
  );
}
