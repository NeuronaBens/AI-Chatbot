import Navbar from "@/components/general/navbar";
import SidebarUser from "@/components/user/sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex">
      <SidebarUser></SidebarUser>
      {children}
    </div>
  );
}
