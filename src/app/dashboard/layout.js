import AdminNav from "@/components/AdminNavbarComponent/AdminNav";
import Sidebar from "@/components/SidebarComponents/Sidebar";


export default function Layout({ children }) {
  return (
    <>
      {/* <AdminNav /> */}
      <div className="flex">
        <Sidebar />
        {children}
      </div>
    </>
  )
}