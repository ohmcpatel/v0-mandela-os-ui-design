"use client"

import { useStore } from "@/lib/store"
import { InitiativeCard } from "@/components/initiative-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Filter, Search, ArrowLeft, Grid, List, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { PlanModal } from "@/components/plan-modal"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export function InitiativesExplorer() {
  const { initiatives, selectedInitiative, setSelectedInitiative } = useStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [themeFilter, setThemeFilter] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Get unique themes from initiatives
  const themes = [...new Set(initiatives.map((initiative) => initiative.theme))]

  // Filter initiatives by search query and selected themes
  const filteredInitiatives = initiatives
    .filter(
      (initiative) =>
        initiative.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        initiative.theme.toLowerCase().includes(searchQuery.toLowerCase()) ||
        initiative.partners.some((partner) => partner.toLowerCase().includes(searchQuery.toLowerCase())),
    )
    .filter((initiative) => themeFilter.length === 0 || themeFilter.includes(initiative.theme))

  const handleViewPlan = (initiativeId: string) => {
    setSelectedInitiative(initiativeId)
    setIsModalOpen(true)
  }

  if (initiatives.length === 0) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Initiatives Explorer</CardTitle>
              <CardDescription>Browse and manage your CSR initiatives</CardDescription>
            </div>
            <Button asChild variant="outline" size="sm" className="gap-2">
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="py-10 text-center">
          <p className="text-slate-500 mb-4">No initiatives yet. Start by describing your company on the dashboard.</p>
          <Button asChild variant="default" className="gap-2">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Go to Dashboard
            </Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Initiatives Explorer</h1>
        <Button asChild variant="outline" size="sm" className="gap-2">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
          <Input
            type="search"
            placeholder="Search initiatives, themes, partners..."
            className="pl-9 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
                {themeFilter.length > 0 && <Badge className="ml-1">{themeFilter.length}</Badge>}
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

          <div className="border rounded-md flex">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              className="rounded-r-none"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              className="rounded-l-none"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Initiative
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Initiatives ({initiatives.length})</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="planning">Planning</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
      </Tabs>

      {filteredInitiatives.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center">
            <p className="text-slate-500 mb-4">No initiatives match your search criteria.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setThemeFilter([])
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInitiatives.map((initiative) => (
            <InitiativeCard
              key={initiative.id}
              initiative={initiative}
              onViewPlan={() => handleViewPlan(initiative.id)}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredInitiatives.map((initiative) => (
            <Card key={initiative.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-2 bg-emerald-600" />
                <div className="flex-1 p-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold">{initiative.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700">
                          {initiative.theme}
                        </Badge>
                        <span className="text-sm text-slate-500">Partners: {initiative.partners.join(", ")}</span>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleViewPlan(initiative.id)}
                      className="gap-2 bg-emerald-600 hover:bg-emerald-700"
                    >
                      View Plan
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {selectedInitiative && <PlanModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </div>
  )
}
