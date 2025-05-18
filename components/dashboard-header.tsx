"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useStore } from "@/lib/store"
import { Sparkles, Bell, Search, User, Settings, LogOut, HelpCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"

interface DashboardHeaderProps {
  onDeployTeam: () => void
}

export function DashboardHeader({ onDeployTeam }: DashboardHeaderProps) {
  const { companyName, clearAllData } = useStore()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false)
  const [notificationCount, setNotificationCount] = useState(3)

  const notifications = [
    {
      id: 1,
      title: "New Partner Request",
      description: "World Wildlife Fund wants to collaborate",
      time: "2 hours ago",
      isNew: true,
    },
    {
      id: 2,
      title: "Initiative Milestone Reached",
      description: "Digital Literacy program reached 500 students",
      time: "Yesterday",
      isNew: true,
    },
    {
      id: 3,
      title: "Quarterly Report Due",
      description: "Prepare your Q2 CSR impact report",
      time: "3 days ago",
      isNew: true,
    },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      toast({
        title: "Search Results",
        description: `Searching for "${searchQuery}"`,
      })
    }
  }

  const handleClearNotifications = () => {
    setNotificationCount(0)
    toast({
      title: "Notifications Cleared",
      description: "All notifications have been marked as read.",
    })
  }

  const handleNotificationClick = (id: number) => {
    toast({
      title: "Notification Opened",
      description: `Opening details for notification #${id}`,
    })

    // Reduce notification count when clicked
    if (notificationCount > 0) {
      setNotificationCount(notificationCount - 1)
    }
  }

  const handleResetApp = () => {
    clearAllData()
    setIsResetDialogOpen(false)
    toast({
      title: "Application Reset",
      description: "All data has been cleared successfully.",
      variant: "destructive",
    })
  }

  return (
    <header className="border-b bg-white dark:bg-slate-900 dark:border-slate-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">Dashboard</h1>
          <form onSubmit={handleSearch} className="hidden md:flex relative max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
            <Input
              type="search"
              placeholder="Search initiatives, reports..."
              className="pl-9 w-full max-w-xs bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:placeholder:text-slate-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={onDeployTeam}
            className="hidden md:flex gap-2 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:text-white"
          >
            <Sparkles className="h-4 w-4" />
            Deploy CSR Team
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="relative dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
              >
                <Bell className="h-4 w-4" />
                {notificationCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] dark:bg-emerald-600">
                    {notificationCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 dark:bg-slate-900 dark:border-slate-700">
              <div className="flex justify-between items-center">
                <DropdownMenuLabel className="dark:text-slate-100">Notifications</DropdownMenuLabel>
                {notificationCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs h-7 px-2 mr-2 dark:text-slate-300 dark:hover:bg-slate-800"
                    onClick={handleClearNotifications}
                  >
                    Mark all as read
                  </Button>
                )}
              </div>
              <DropdownMenuSeparator className="dark:bg-slate-700" />
              {notifications.length > 0 ? (
                <>
                  {notifications.map((notification) => (
                    <DropdownMenuItem
                      key={notification.id}
                      className="flex flex-col items-start cursor-pointer dark:hover:bg-slate-800 dark:focus:bg-slate-800"
                      onClick={() => handleNotificationClick(notification.id)}
                    >
                      <div className="flex items-start gap-2 w-full">
                        <div className="flex-1">
                          <p className="font-medium dark:text-slate-100">{notification.title}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{notification.description}</p>
                          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{notification.time}</p>
                        </div>
                        {notification.isNew && (
                          <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300 mt-1">
                            New
                          </Badge>
                        )}
                      </div>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator className="dark:bg-slate-700" />
                  <DropdownMenuItem className="justify-center text-sm text-emerald-600 dark:text-emerald-400 dark:hover:bg-slate-800 dark:focus:bg-slate-800">
                    View all notifications
                  </DropdownMenuItem>
                </>
              ) : (
                <div className="py-4 text-center text-sm text-slate-500 dark:text-slate-400">No new notifications</div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-emerald-700 dark:text-emerald-300 font-medium"
              >
                {companyName ? companyName.charAt(0) : "A"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="dark:bg-slate-900 dark:border-slate-700">
              <DropdownMenuLabel className="dark:text-slate-100">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="dark:bg-slate-700" />
              <DropdownMenuItem className="cursor-pointer dark:text-slate-300 dark:hover:bg-slate-800 dark:focus:bg-slate-800">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer dark:text-slate-300 dark:hover:bg-slate-800 dark:focus:bg-slate-800">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer dark:text-slate-300 dark:hover:bg-slate-800 dark:focus:bg-slate-800">
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help & Support</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="dark:bg-slate-700" />
              <DropdownMenuItem
                className="cursor-pointer text-red-600 dark:text-red-400 dark:hover:bg-slate-800 dark:focus:bg-slate-800"
                onClick={() => setIsResetDialogOpen(true)}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Reset Application</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Dialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
        <DialogContent className="dark:bg-slate-900 dark:border-slate-700">
          <DialogHeader>
            <DialogTitle className="dark:text-slate-100">Reset Application</DialogTitle>
            <DialogDescription className="dark:text-slate-400">
              This will clear all your data including initiatives, company information, and settings. This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 sm:justify-between">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={handleResetApp}
              className="dark:bg-red-900 dark:hover:bg-red-800 dark:text-white"
            >
              Reset Everything
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  )
}
