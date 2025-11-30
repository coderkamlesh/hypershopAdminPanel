import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
// import AppSidebar from "@/components/layout/AppSidebar"
// import Navbar from "@/components/layout/Navbar"
import { Outlet } from "react-router-dom"
import AppSidebar from "./AppSidebar"
import AppNavbar from "./AppNavbar"

export default function AppLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>       
        <AppNavbar />
        {/* Page Content */}
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/20 min-h-[calc(100vh-4rem)]">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}