import SidebarAdmin from "@/components/admin/sidebar";
import React from "react";

export default async function Layout({ children }) {

  return (
      <SidebarAdmin>
        {children}
      </SidebarAdmin>
  );
}
