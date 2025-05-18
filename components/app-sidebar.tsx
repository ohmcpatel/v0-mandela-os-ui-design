"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useStore } from "@/lib/store"
import {
  Building2,
  LayoutDashboard,
  Lightbulb,
  Users,
  FileBarChart2,
  Handshake,
  Settings,
  HelpCircle,
  LogOut,
  Sparkles,
  ChevronRight,
} from "lucide-react"
import { useState } from "react"
import { DeployTeamModal } from "@/components/deploy-team-modal"
import { Badge } from "@/components/ui/badge"

export function AppSidebar() {
  const pathname = usePathname()
  const { companyName } = useStore()
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false)

  return (
    <>
      <Sidebar className="border-r border-slate-200 dark:border-slate-800">
        <SidebarHeader className="pb-0">
          <div className="flex items-center gap-2 px-3 py-4">
            <div className="h-8 w-8 rounded-md bg-emerald-600 dark:bg-emerald-700 flex items-center justify-center text-white">
              <Building2 className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 dark:from-emerald-500 dark:to-emerald-400 bg-clip-text text-transparent">
              MandelaOS
            </h1>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <div className="px-3 py-2">
            <Button
              onClick={() => setIsDeployModalOpen(true)}
              className="w-full justify-between gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 dark:from-emerald-700 dark:to-emerald-600 hover:from-emerald-700 hover:to-emerald-600 dark:hover:from-emerald-800 dark:hover:to-emerald-700 text-white"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                <span>Deploy CSR Team</span>
              </div>
              <ChevronRight className="h-4 w-4 opacity-70" />
            </Button>
          </div>

          <SidebarSeparator className="my-2 dark:bg-slate-700" />

          <SidebarGroup>
            <SidebarGroupLabel className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Navigation
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/"}>
                    <Link href="/" className="flex items-center gap-3">
                      <div
                        className={`p-1 rounded-md ${pathname === "/" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300" : "text-slate-500 dark:text-slate-400"}`}
                      >
                        <LayoutDashboard className="h-4 w-4" />
                      </div>
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/initiatives"}>
                    <Link href="/initiatives" className="flex items-center gap-3">
                      <div
                        className={`p-1 rounded-md ${pathname === "/initiatives" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300" : "text-slate-500 dark:text-slate-400"}`}
                      >
                        <Lightbulb className="h-4 w-4" />
                      </div>
                      <span>Initiatives</span>
                      <Badge className="ml-auto bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-800">
                        3
                      </Badge>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/team"}>
                    <Link href="/team" className="flex items-center gap-3">
                      <div
                        className={`p-1 rounded-md ${pathname === "/team" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300" : "text-slate-500 dark:text-slate-400"}`}
                      >
                        <Users className="h-4 w-4" />
                      </div>
                      <span>Virtual Team</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/reports"}>
                    <Link href="/reports" className="flex items-center gap-3">
                      <div
                        className={`p-1 rounded-md ${pathname === "/reports" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300" : "text-slate-500 dark:text-slate-400"}`}
                      >
                        <FileBarChart2 className="h-4 w-4" />
                      </div>
                      <span>Reports</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/partners"}>
                    <Link href="/partners" className="flex items-center gap-3">
                      <div
                        className={`p-1 rounded-md ${pathname === "/partners" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300" : "text-slate-500 dark:text-slate-400"}`}
                      >
                        <Handshake className="h-4 w-4" />
                      </div>
                      <span>Partners</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator className="my-2 dark:bg-slate-700" />

          <SidebarGroup>
            <SidebarGroupLabel className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Active Company
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="mx-3 my-2 p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-md bg-gradient-to-br from-emerald-600 to-emerald-500 dark:from-emerald-700 dark:to-emerald-600 flex items-center justify-center text-white font-medium">
                    {companyName ? companyName.charAt(0) : "A"}
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-medium truncate dark:text-slate-100">{companyName || "Acme Corp"}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">CSR Department</p>
                  </div>
                </div>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t border-slate-200 dark:border-slate-700 mt-auto">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/settings" className="flex items-center gap-3">
                  <div className="p-1 rounded-md text-slate-500 dark:text-slate-400">
                    <Settings className="h-4 w-4" />
                  </div>
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/help" className="flex items-center gap-3">
                  <div className="p-1 rounded-md text-slate-500 dark:text-slate-400">
                    <HelpCircle className="h-4 w-4" />
                  </div>
                  <span>Help & Support</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton className="flex items-center gap-3">
                <div className="p-1 rounded-md text-slate-500 dark:text-slate-400">
                  <LogOut className="h-4 w-4" />
                </div>
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <div className="p-3 flex justify-end">
            <ThemeToggle />
          </div>
        </SidebarFooter>
      </Sidebar>
      <DeployTeamModal isOpen={isDeployModalOpen} onClose={() => setIsDeployModalOpen(false)} />
    </>
  )
}
