"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { useStore } from "@/lib/store"
import { Users, Building, TreePine, DollarSign, TrendingUp, Calendar, Info, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function KpiDashboard() {
  const { initiatives } = useStore()
  const { toast } = useToast()
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Calculate dummy KPIs
  const totalPartnerships = initiatives.reduce((acc, init) => acc + init.partners.length, 0)
  const employeeEngagement = Math.floor(Math.random() * 30) + 70 // 70-100%
  const communityImpact = Math.floor(Math.random() * 5000) + 1000 // 1000-6000
  const carbonOffset = Math.floor(Math.random() * 100) + 50 // 50-150 tons
  const budgetUtilization = Math.floor(Math.random() * 30) + 70 // 70-100%

  // Get current date for the next report
  const currentDate = new Date()
  const nextReportDate = new Date(currentDate)
  nextReportDate.setMonth(currentDate.getMonth() + 3)

  const handleRefreshMetrics = () => {
    setIsRefreshing(true)

    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false)
      toast({
        title: "Metrics Refreshed",
        description: "Dashboard metrics have been updated with the latest data.",
      })
    }, 1500)
  }

  const handleViewDetails = (metric: string) => {
    toast({
      title: `${metric} Details`,
      description: `Opening detailed view for ${metric.toLowerCase()} metrics.`,
    })
  }

  if (initiatives.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>CSR Impact Dashboard</CardTitle>
          <CardDescription>Key performance indicators for your CSR initiatives</CardDescription>
        </CardHeader>
        <CardContent className="py-10 text-center">
          <p className="text-slate-500">Generate initiatives to see your impact metrics</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>CSR Impact Dashboard</CardTitle>
          <CardDescription>Key performance indicators for your CSR initiatives</CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={handleRefreshMetrics} disabled={isRefreshing} className="h-8">
          {isRefreshing ? "Refreshing..." : "Refresh Metrics"}
        </Button>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex flex-col space-y-1.5">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-emerald-500" />
                <span className="text-sm font-medium">Partnerships</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3 w-3 text-slate-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-[200px] text-xs">Total number of partner organizations across all initiatives</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">{totalPartnerships}</span>
                <span className="text-xs text-emerald-600">+{initiatives.length} new</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 p-0 text-xs text-emerald-600 justify-start"
                onClick={() => handleViewDetails("Partnerships")}
              >
                View details <ArrowUpRight className="ml-1 h-3 w-3" />
              </Button>
            </div>

            <div className="flex flex-col space-y-1.5">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-emerald-500" />
                <span className="text-sm font-medium">Employee Engagement</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3 w-3 text-slate-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-[200px] text-xs">Percentage of employees participating in CSR initiatives</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">{employeeEngagement}%</span>
                <span className="text-xs text-emerald-600">+12% YoY</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 p-0 text-xs text-emerald-600 justify-start"
                onClick={() => handleViewDetails("Employee Engagement")}
              >
                View details <ArrowUpRight className="ml-1 h-3 w-3" />
              </Button>
            </div>

            <div className="flex flex-col space-y-1.5">
              <div className="flex items-center gap-2">
                <TreePine className="h-4 w-4 text-emerald-500" />
                <span className="text-sm font-medium">Carbon Offset</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3 w-3 text-slate-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-[200px] text-xs">
                      Total carbon emissions offset through sustainability initiatives
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">{carbonOffset}</span>
                <span className="text-xs">tons CO₂e</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 p-0 text-xs text-emerald-600 justify-start"
                onClick={() => handleViewDetails("Carbon Offset")}
              >
                View details <ArrowUpRight className="ml-1 h-3 w-3" />
              </Button>
            </div>

            <div className="flex flex-col space-y-1.5">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                <span className="text-sm font-medium">Community Impact</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3 w-3 text-slate-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-[200px] text-xs">Number of people positively impacted by CSR programs</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">{communityImpact}</span>
                <span className="text-xs">people reached</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 p-0 text-xs text-emerald-600 justify-start"
                onClick={() => handleViewDetails("Community Impact")}
              >
                View details <ArrowUpRight className="ml-1 h-3 w-3" />
              </Button>
            </div>

            <div className="flex flex-col space-y-1.5">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-emerald-500" />
                <span className="text-sm font-medium">Budget Utilization</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3 w-3 text-slate-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-[200px] text-xs">Percentage of allocated CSR budget utilized effectively</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">{budgetUtilization}%</span>
                <span className="text-xs text-emerald-600">on target</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 p-0 text-xs text-emerald-600 justify-start"
                onClick={() => handleViewDetails("Budget Utilization")}
              >
                View details <ArrowUpRight className="ml-1 h-3 w-3" />
              </Button>
            </div>

            <div className="flex flex-col space-y-1.5">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-emerald-500" />
                <span className="text-sm font-medium">Next Report Due</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3 w-3 text-slate-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-[200px] text-xs">Due date for the next quarterly CSR impact report</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">
                  {nextReportDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
                <span className="text-xs">{nextReportDate.getFullYear()}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 p-0 text-xs text-emerald-600 justify-start"
                onClick={() => handleViewDetails("Reporting Schedule")}
              >
                View schedule <ArrowUpRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </div>
        </TooltipProvider>
      </CardContent>
      <CardFooter className="pt-0">
        <p className="text-xs text-slate-500">Last updated: {new Date().toLocaleString()}</p>
      </CardFooter>
    </Card>
  )
}
