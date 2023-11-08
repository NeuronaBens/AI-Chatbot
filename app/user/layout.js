"use client";
import SidebarUser from "@/components/user/sidebar";
import { useState } from "react";
import React from "react";

export default function Layout({ children }) {
  const [closed, setClosed] = useState(false);

  function toggle() {
    setClosed(!closed);
  }

  const mainClass = closed ? "w-11/12 ml-auto" : "w-10/12 ml-auto";

  return (
    <div className="flex">
      <SidebarUser closed={closed} toggle={toggle}></SidebarUser>
      <div className={mainClass}>{children}</div>
    </div>
  );
}
