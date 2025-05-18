"use client"

import { useStore } from "@/lib/store"
import { InitiativeCard } from "@/components/initiative-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Filter } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"

interface InitiativesDashboardProps {
  onViewPlan: (initiativeId: string) => void
}

export function InitiativesDashboard({ onViewPlan }: InitiativesDashboardProps) {
  const { initiatives } = useStore()
  const [themeFilter, setThemeFilter] = useState<string[]>([])

  // Get unique themes from initiatives
  const themes = [...new Set(initiatives.map((initiative) => initiative.theme))]

  // Filter initiatives by selected themes
  const filteredInitiatives =
    themeFilter.length > 0 ? initiatives.filter((initiative) => themeFilter.includes(initiative.theme)) : initiatives

  if (initiatives.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>CSR Initiatives</CardTitle>
          <CardDescription>Enter your company details to generate CSR initiatives</CardDescription>
        </CardHeader>
        <CardContent className="py-10 text-center">
          <p className="text-slate-500 mb-4">No initiatives yet. Start by describing your company above.</p>
          <Button variant="outline" disabled className="gap-2">
            <Plus className="h-4 w-4" />
            Add Initiative Manually
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">CSR Initiatives</h2>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by Theme</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {themes.map((theme) => (
                <DropdownMenuCheckboxItem
                  key={theme}
                  checked={themeFilter.includes(theme)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setThemeFilter([...themeFilter, theme])
                    } else {
                      setThemeFilter(themeFilter.filter((t) => t !== theme))
                    }
                  }}
                >
                  {theme}
                </DropdownMenuCheckboxItem>
              ))}
              {themeFilter.length > 0 && (
                <>
                  <DropdownMenuSeparator />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-center text-xs"
                    onClick={() => setThemeFilter([])}
                  >
                    Clear Filters
                  </Button>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Initiative
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInitiatives.map((initiative) => (
          <InitiativeCard key={initiative.id} initiative={initiative} onViewPlan={() => onViewPlan(initiative.id)} />
        ))}
      </div>
    </div>
  )
}
