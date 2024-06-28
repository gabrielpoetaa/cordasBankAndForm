import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar/index";

export function DefaultLayout() {
  return (
    <html lang="en" className="antialiased">
    <div className="min-h-screen grid grid-cols-app ">
      <Sidebar />
      <div className="px-4 pb-12 pt-8">
        <Outlet />
      </div>
    </div>
    </html>
  )
}