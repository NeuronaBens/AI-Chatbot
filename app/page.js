import Navbar from "@/components/general/navbar";
import NavbarContentAuthentication from "@/components/authentication/navbar-content";

export default function Home() {
  return (
    <div>
      <Navbar>
        <NavbarContentAuthentication></NavbarContentAuthentication>
      </Navbar>
      <div>Bienvenido a tu chatbot de salud mental</div>
    </div>
  );
}
