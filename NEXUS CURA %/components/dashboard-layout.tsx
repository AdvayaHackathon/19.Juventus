"use client"

import { useState, type ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  CrossIcon as MedicalCross,
  Users,
  UserCircle,
  Pill,
  GraduationCap,
  ShieldAlert,
  Menu,
  LogOut,
  Bell,
  Settings,
  Building2,
  BookOpen,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { NexusCuraLogo } from "@/components/nexus-cura-logo"

interface DashboardLayoutProps {
  children: ReactNode
  title: string
  userRole: string
  userName: string
}

export default function DashboardLayout({ children, title, userRole, userName }: DashboardLayoutProps) {
  const pathname = usePathname()
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  const navigation = [
    {
      name: "Receptionist",
      href: "/dashboard/receptionist",
      icon: <Users className="h-5 w-5" />,
      active: pathname === "/dashboard/receptionist",
    },
    {
      name: "Patient",
      href: "/dashboard/patient",
      icon: <UserCircle className="h-5 w-5" />,
      active: pathname === "/dashboard/patient",
    },
    {
      name: "Doctor",
      href: "/dashboard/doctor",
      icon: <MedicalCross className="h-5 w-5" />,
      active: pathname === "/dashboard/doctor",
    },
    {
      name: "Pharmacist",
      href: "/dashboard/pharmacist",
      icon: <Pill className="h-5 w-5" />,
      active: pathname === "/dashboard/pharmacist",
    },
    {
      name: "Hospital",
      href: "/dashboard/hospital",
      icon: <Building2 className="h-5 w-5" />,
      active: pathname === "/dashboard/hospital",
    },
    {
      name: "Student",
      href: "/dashboard/student",
      icon: <GraduationCap className="h-5 w-5" />,
      active: pathname === "/dashboard/student",
    },
    {
      name: "College Portal",
      href: "/dashboard/college",
      icon: <BookOpen className="h-5 w-5" />,
      active: pathname === "/dashboard/college",
    },
    {
      name: "Admin",
      href: "/dashboard/admin",
      icon: <ShieldAlert className="h-5 w-5" />,
      active: pathname === "/dashboard/admin",
    },
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-1 min-h-0 bg-white border-r border-gray-200">
          <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-gray-200">
            <Link href="/">
              <NexusCuraLogo />
            </Link>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto pt-5 pb-4">
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    item.active ? "bg-indigo-50 text-indigo-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <div
                    className={`mr-3 ${item.active ? "text-indigo-500" : "text-gray-400 group-hover:text-gray-500"}`}
                  >
                    {item.icon}
                  </div>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <Link href="/login" className="flex-shrink-0 w-full group block">
              <div className="flex items-center">
                <div>
                  <Avatar className="inline-block h-9 w-9 rounded-full">
                    <AvatarFallback className="bg-indigo-100 text-indigo-700">
                      {userName?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{userName}</p>
                  <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">{userRole}</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden">
        <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
          <SheetContent side="left" className="w-64 p-0">
            <div className="flex flex-col flex-1 min-h-0 bg-white">
              <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-gray-200">
                <Link href="/" onClick={() => setIsMobileNavOpen(false)}>
                  <NexusCuraLogo />
                </Link>
              </div>
              <div className="flex-1 flex flex-col overflow-y-auto pt-5 pb-4">
                <nav className="mt-5 flex-1 px-2 space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                        item.active
                          ? "bg-indigo-50 text-indigo-700"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                      onClick={() => setIsMobileNavOpen(false)}
                    >
                      <div
                        className={`mr-3 ${item.active ? "text-indigo-500" : "text-gray-400 group-hover:text-gray-500"}`}
                      >
                        {item.icon}
                      </div>
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                <Link
                  href="/login"
                  className="flex-shrink-0 w-full group block"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  <div className="flex items-center">
                    <div>
                      <Avatar className="inline-block h-9 w-9 rounded-full">
                        <AvatarFallback className="bg-indigo-100 text-indigo-700">
                          {userName?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{userName}</p>
                      <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">{userRole}</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-white border-b border-gray-200">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileNavOpen(true)}
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none"
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-indigo-100 text-indigo-700">
                          {userName?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="py-4">{children}</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
