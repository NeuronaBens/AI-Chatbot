import SidebarUser from "@/components/user/sidebar";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function Layout({ children }) {
  const session = await getServerSession(authOptions);

  return (
      <SidebarUser session={...session} >
        {children}
      </SidebarUser>
  );
}
