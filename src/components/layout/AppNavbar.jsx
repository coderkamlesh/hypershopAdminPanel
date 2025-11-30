// components/layout/Navbar.jsx
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, User, LogOut, Settings, Sun, Moon, MonitorCog } from "lucide-react"
import { useNavigate } from "react-router-dom"
import useAuthStore, { selectUser, selectLogout } from "@/store/authStore"
import { useTheme } from "@/hooks/useTheme"

export default function AppNavbar() {
  const navigate = useNavigate()
  const user = useAuthStore(selectUser)
  const logout = useAuthStore(selectLogout)

  const { theme, changeTheme } = useTheme()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b bg-background px-6">
      <SidebarTrigger />

      <div className="flex-1" />

      {/* Notifications */}
      <Button variant="ghost" size="icon" className="relative">
        <Bell className="h-5 w-5" />
        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-600 text-[10px] font-medium text-white flex items-center justify-center">
          3
        </span>
      </Button>

      {/* Theme toggle (system-aware) */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            {/* Icon reflect current effective theme */}
            {theme === "dark" && <Moon className="h-5 w-5" />}
            {theme === "light" && <Sun className="h-5 w-5" />}
            {theme === "system" && <MonitorCog className="h-5 w-5" />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => changeTheme("system")}>
            <MonitorCog className="mr-2 h-4 w-4" />
            <span>System</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => changeTheme("light")}>
            <Sun className="mr-2 h-4 w-4" />
            <span>Light</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => changeTheme("dark")}>
            <Moon className="mr-2 h-4 w-4" />
            <span>Dark</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* User menu same as before */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          {/* ...profile/settings/logout same as pehle... */}
          <DropdownMenuItem onClick={handleLogout} className="text-red-600">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
