"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Initiative } from "@/lib/types"
import { ArrowRight, Target, Building, Calendar, MoreHorizontal, Heart } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import { useStore } from "@/lib/store"

interface InitiativeCardProps {
  initiative: Initiative
  onViewPlan: () => void
}

export function InitiativeCard({ initiative, onViewPlan }: InitiativeCardProps) {
  const { toast } = useToast()
  const { toggleFavoriteInitiative, favoriteInitiatives } = useStore()
  const [progress, setProgress] = useState(Math.floor(Math.random() * 80) + 10) // 10-90%
  const isFavorite = favoriteInitiatives.includes(initiative.id)

  // Get the first phase timeline for display
  const timeline = initiative.executionPlan.roadmap[0]?.timeline || "In planning"

  const handleFavoriteToggle = () => {
    toggleFavoriteInitiative(initiative.id)
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite
        ? `${initiative.name} has been removed from your favorites.`
        : `${initiative.name} has been added to your favorites.`,
    })
  }

  const handleEdit = () => {
    toast({
      title: "Edit Initiative",
      description: `Opening editor for ${initiative.name}.`,
    })
  }

  const handleDuplicate = () => {
    toast({
      title: "Initiative Duplicated",
      description: `A copy of ${initiative.name} has been created.`,
    })
  }

  const handleShare = () => {
    // Simulate copying a share link
    toast({
      title: "Share Link Copied",
      description: "Initiative share link has been copied to clipboard.",
    })
  }

  const handleArchive = () => {
    toast({
      title: "Initiative Archived",
      description: `${initiative.name} has been archived.`,
      variant: "destructive",
    })
  }

  return (
    <Card className="h-full flex flex-col transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">{initiative.name}</h3>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100">
                {initiative.theme}
              </Badge>
              <div className="flex items-center text-xs text-slate-500">
                <Calendar className="h-3 w-3 mr-1" />
                {timeline}
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleEdit}>Edit Initiative</DropdownMenuItem>
              <DropdownMenuItem onClick={handleDuplicate}>Duplicate</DropdownMenuItem>
              <DropdownMenuItem onClick={handleShare}>Share</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleArchive} className="text-red-600">
                Archive Initiative
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <Building className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Partner Organizations</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">{initiative.partners.join(", ")}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Target className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Key Metrics</p>
                <ul className="text-sm text-slate-600 dark:text-slate-400 list-disc list-inside">
                  {initiative.metrics.map((metric, index) => (
                    <li key={index}>{metric}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium text-slate-700 dark:text-slate-300">Progress</span>
              <span className="text-slate-600 dark:text-slate-400">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button
          variant={isFavorite ? "default" : "outline"}
          size="sm"
          className={`gap-1 ${isFavorite ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 hover:text-emerald-800 border-emerald-200" : ""}`}
          onClick={handleFavoriteToggle}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? "fill-emerald-700" : ""}`} />
          <span className="sr-only md:not-sr-only md:inline">{isFavorite ? "Favorited" : "Favorite"}</span>
        </Button>
        <Button onClick={onViewPlan} className="flex-1 justify-between bg-emerald-600 hover:bg-emerald-700">
          View Execution Plan
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  )
}
