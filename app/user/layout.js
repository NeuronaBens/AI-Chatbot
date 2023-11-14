import SidebarUser from "@/components/user/sidebar";
import React from "react";

export default async function Layout({ children }) {
  return (
      <SidebarUser>
        {children}
      </SidebarUser>
  );
}
