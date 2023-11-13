import Navbar from "@/components/general/navbar";

export default function Layout({ children }) {
  return (
    <div>
      <Navbar>Access As Admin</Navbar>
      {children}
    </div>
  );
}
