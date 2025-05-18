"use client"

import { useState, useEffect } from "react"
import { InputPanel } from "@/components/input-panel"
import { InitiativesDashboard } from "@/components/initiatives-dashboard"
import { ReportGenerator } from "@/components/report-generator"
import { PlanModal } from "@/components/plan-modal"
import { useStore } from "@/lib/store"
import { DashboardHeader } from "@/components/dashboard-header"
import { DeployTeamModal } from "@/components/deploy-team-modal"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { KpiDashboard } from "@/components/kpi-dashboard"
import { UpcomingTasks } from "@/components/upcoming-tasks"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export function Dashboard() {
  const { selectedInitiative, setSelectedInitiative, initiatives, companyDescription } = useStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const { toast } = useToast()
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true)

  useEffect(() => {
    // Show welcome message only on first load
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome")
    if (hasSeenWelcome) {
      setShowWelcomeMessage(false)
    } else {
      // Set a timeout to auto-dismiss the welcome message
      const timer = setTimeout(() => {
        setShowWelcomeMessage(false)
        localStorage.setItem("hasSeenWelcome", "true")
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    // If initiatives are generated, switch to initiatives tab
    if (initiatives.length > 0 && companyDescription && activeTab === "overview") {
      const timer = setTimeout(() => {
        toast({
          title: "Initiatives Generated",
          description: "Your CSR initiatives are ready to explore.",
        })
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [initiatives, companyDescription, activeTab, toast])

  const handleViewPlan = (initiativeId: string) => {
    setSelectedInitiative(initiativeId)
    setIsModalOpen(true)
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)

    // If switching to reports tab with initiatives, show a helpful toast
    if (value === "reports" && initiatives.length > 0) {
      toast({
        title: "Report Generation Available",
        description: "Generate professional reports based on your CSR initiatives.",
      })
    }
  }

  return (
    <div className="flex flex-col h-full w-full min-h-screen">
      <DashboardHeader onDeployTeam={() => setIsDeployModalOpen(true)} />
      <div className="w-full flex-1 bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="container mx-auto px-4 py-6">
          {showWelcomeMessage && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between">
              <div>
                <h3 className="font-medium text-emerald-800">Welcome to MandelaOS</h3>
                <p className="text-sm text-emerald-700">
                  Start by describing your company below to generate tailored CSR initiatives.
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-emerald-700 hover:text-emerald-800 hover:bg-emerald-100"
                onClick={() => setShowWelcomeMessage(false)}
              >
                Dismiss
              </Button>
            </div>
          )}

          <Tabs defaultValue="overview" value={activeTab} onValueChange={handleTabChange} className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="initiatives">
                Initiatives
                {initiatives.length > 0 && (
                  <span className="ml-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-xs font-medium text-emerald-800">
                    {initiatives.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 min-h-[500px]">
              <InputPanel />
              {initiatives.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <KpiDashboard />
                  </div>
                  <div>
                    <UpcomingTasks />
                  </div>
                </div>
              ) : (
                <div className="mt-8 text-center">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 mb-4">
                    <Sparkles className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Ready to Build Your CSR Department</h3>
                  <p className="text-slate-600 max-w-md mx-auto mb-6">
                    Describe your company above to generate tailored CSR initiatives powered by AI. The more details you
                    provide, the better your initiatives will be.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      variant="outline"
                      onClick={() => {
                        toast({
                          title: "Example Loaded",
                          description: "An example company description has been loaded.",
                        })

                        const exampleInput = document.querySelector("textarea") as HTMLTextAreaElement
                        if (exampleInput) {
                          exampleInput.value =
                            "We're a Series B fintech startup focused on financial inclusion for underserved communities. Our core values are transparency, accessibility, and sustainability."
                          // Trigger a change event
                          const event = new Event("input", { bubbles: true })
                          exampleInput.dispatchEvent(event)
                        }
                      }}
                    >
                      Load Example
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        toast({
                          title: "Tutorial Started",
                          description: "Starting a guided tour of MandelaOS features.",
                        })
                      }}
                    >
                      Take a Tour
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="initiatives" className="space-y-6 min-h-[500px]">
              <InitiativesDashboard onViewPlan={handleViewPlan} />
            </TabsContent>

            <TabsContent value="reports" className="space-y-6 min-h-[500px]">
              <ReportGenerator />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {selectedInitiative && <PlanModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
      <DeployTeamModal isOpen={isDeployModalOpen} onClose={() => setIsDeployModalOpen(false)} />
    </div>
  )
}
