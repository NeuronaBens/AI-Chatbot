import Navbar from "@/components/general/navbar";
import NavbarContentAdmin from "@/components/admin/navbar-content";

export default function Layout({ children }) {
  return (
    <div>
      <Navbar>
        <NavbarContentAdmin></NavbarContentAdmin>
      </Navbar>
      {children}
    </div>
  );
}
