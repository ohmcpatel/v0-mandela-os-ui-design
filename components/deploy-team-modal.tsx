"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Sparkles, Loader2, Calendar, MessageSquare, FileText } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"

interface DeployTeamModalProps {
  isOpen: boolean
  onClose: () => void
}

export function DeployTeamModal({ isOpen, onClose }: DeployTeamModalProps) {
  const [isDeploying, setIsDeploying] = useState(false)
  const [deployProgress, setDeployProgress] = useState(0)
  const [deployStage, setDeployStage] = useState("")
  const { toast } = useToast()

  const virtualTeamMembers = [
    {
      id: "tm1",
      name: "Sarah Miller",
      role: "CSR Program Manager",
      avatar: "/placeholder.svg?key=9mlb0",
      skills: ["Project Management", "Stakeholder Relations", "Strategic Planning"],
    },
    {
      id: "tm2",
      name: "James Davis",
      role: "Community Outreach Specialist",
      avatar: "/placeholder.svg?key=o1adb",
      skills: ["Partnership Development", "Event Planning", "Communications"],
    },
    {
      id: "tm3",
      name: "Aisha Washington",
      role: "Data Analyst",
      avatar: "/placeholder.svg?key=q76cx",
      skills: ["Impact Measurement", "Reporting", "Data Visualization"],
    },
    {
      id: "tm4",
      name: "Michael Chen",
      role: "Sustainability Expert",
      avatar: "/placeholder.svg?key=9p6za",
      skills: ["Environmental Assessment", "Carbon Footprint Analysis", "Green Initiatives"],
    },
    {
      id: "tm5",
      name: "Elena Rodriguez",
      role: "Communications Specialist",
      avatar: "/placeholder.svg?key=xgs3u",
      skills: ["Content Creation", "Social Media", "PR Strategy"],
    },
  ]

  const [selectedMembers, setSelectedMembers] = useState<string[]>(virtualTeamMembers.slice(0, 3).map((m) => m.id))

  const handleDeployTeam = () => {
    setIsDeploying(true)

    // Simulate deployment process
    const stages = [
      "Initializing virtual team members...",
      "Setting up communication channels...",
      "Assigning roles and responsibilities...",
      "Generating onboarding materials...",
      "Creating initial task assignments...",
      "Finalizing deployment...",
    ]

    let currentStage = 0
    const interval = setInterval(() => {
      if (currentStage < stages.length) {
        setDeployStage(stages[currentStage])
        setDeployProgress(Math.round(((currentStage + 1) / stages.length) * 100))
        currentStage++
      } else {
        clearInterval(interval)
        toast({
          title: "CSR Team Deployed",
          description: "Your virtual CSR team is now active and ready to work on initiatives.",
          variant: "success",
        })
        setIsDeploying(false)
        onClose()
      }
    }, 1000)
  }

  const toggleMember = (id: string) => {
    if (selectedMembers.includes(id)) {
      setSelectedMembers(selectedMembers.filter((m) => m !== id))
    } else {
      setSelectedMembers([...selectedMembers, id])
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Deploy Your Virtual CSR Team</DialogTitle>
          <DialogDescription>
            Select AI-powered team members to manage and execute your CSR initiatives
          </DialogDescription>
        </DialogHeader>

        {isDeploying ? (
          <div className="py-8 space-y-6">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <Loader2 className="h-12 w-12 animate-spin text-emerald-600" />
              <h3 className="text-lg font-medium">{deployStage}</h3>
              <Progress value={deployProgress} className="w-full max-w-md h-2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <Card>
                <CardContent className="p-4 flex flex-col items-center justify-center space-y-2">
                  <Calendar className="h-8 w-8 text-emerald-600 mb-2" />
                  <p className="font-medium">Setting Up Calendar</p>
                  <p className="text-xs text-slate-500 text-center">Creating meeting schedules and reminders</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex flex-col items-center justify-center space-y-2">
                  <MessageSquare className="h-8 w-8 text-emerald-600 mb-2" />
                  <p className="font-medium">Configuring Comms</p>
                  <p className="text-xs text-slate-500 text-center">Setting up Slack channels and email templates</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex flex-col items-center justify-center space-y-2">
                  <FileText className="h-8 w-8 text-emerald-600 mb-2" />
                  <p className="font-medium">Preparing Documents</p>
                  <p className="text-xs text-slate-500 text-center">Creating project plans and reporting templates</p>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-4 my-4">
              <p className="text-sm text-slate-600">
                Your virtual CSR team consists of AI-powered specialists who will manage your initiatives, generate
                reports, communicate with stakeholders, and track progress. Select team members below:
              </p>

              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {virtualTeamMembers.map((member) => (
                  <div
                    key={member.id}
                    className={`flex items-center gap-3 p-3 rounded-md border ${
                      selectedMembers.includes(member.id) ? "border-emerald-200 bg-emerald-50" : "border-slate-200"
                    }`}
                  >
                    <Checkbox
                      id={member.id}
                      checked={selectedMembers.includes(member.id)}
                      onCheckedChange={() => toggleMember(member.id)}
                    />
                    <Avatar>
                      <AvatarImage src={member.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-slate-600">{member.role}</p>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1 sm:mt-0">
                          {member.skills.slice(0, 2).map((skill, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={handleDeployTeam}
                disabled={selectedMembers.length === 0}
                className="gap-2 bg-emerald-600 hover:bg-emerald-700"
              >
                <Sparkles className="h-4 w-4" />
                Deploy Team ({selectedMembers.length})
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
