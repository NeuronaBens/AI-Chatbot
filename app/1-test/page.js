import Navbar from "@/components/general/navbar";
import NavbarContentAdmin from "@/components/admin/navbar-content";
import NavbarContentAuthentication from "@/components/authentication/navbar-content";
import NavbarContent from "@/components/general/navbar-content";

import SidebarUser from "@/components/user/sidebar";

export default function Home() {
  return (
    <div>
      <Navbar>
        <NavbarContent></NavbarContent>
      </Navbar>
      <Navbar>
        <NavbarContentAdmin></NavbarContentAdmin>
      </Navbar>
      <Navbar>
        <NavbarContentAuthentication></NavbarContentAuthentication>
      </Navbar>
      <SidebarUser></SidebarUser>
    </div>
  );
}
