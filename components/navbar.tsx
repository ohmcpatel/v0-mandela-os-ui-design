"use client"
import { useStore } from "@/lib/store"
import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { DeployTeamModal } from "@/components/deploy-team-modal"
import { DashboardHeader } from "@/components/dashboard-header"

export function Navbar() {
  const { companyName } = useStore()
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false)

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <AppSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader onDeployTeam={() => setIsDeployModalOpen(true)} />
          <div className="flex-1 overflow-auto">{/* Page content will be rendered here */}</div>
        </div>
      </div>
      <DeployTeamModal isOpen={isDeployModalOpen} onClose={() => setIsDeployModalOpen(false)} />
    </SidebarProvider>
  )
}
