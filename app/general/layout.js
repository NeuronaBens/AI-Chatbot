import Navbar from "@/components/general/navbar";
import NavbarContentAuthentication from "@/components/authentication/navbar-content";
import Footer from "@/components/general/footer";

export default function Layout({ children }) {
  return (
    <div>
      <Navbar>
        <NavbarContentAuthentication></NavbarContentAuthentication>
      </Navbar>
      {children}
      <Footer></Footer>
    </div>
  );
}
