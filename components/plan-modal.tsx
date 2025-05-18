"use client"

import { useState } from "react"
import { useStore } from "@/lib/store"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Mail,
  MessageSquare,
  CheckCircle2,
  Clock,
  User2,
  Share2,
  Printer,
  FileText,
  Sparkles,
  Plus,
  Loader2,
  Download,
  Clipboard,
  AlertCircle,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import { useAI } from "@/components/ai-provider"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Progress } from "@/components/ui/progress"

interface PlanModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PlanModal({ isOpen, onClose }: PlanModalProps) {
  const { initiatives, selectedInitiative } = useStore()
  const { toast } = useToast()
  const { isGenerating, analyzeInitiative, suggestImprovements } = useAI()
  const [isDeployDialogOpen, setIsDeployDialogOpen] = useState(false)
  const [deployProgress, setDeployProgress] = useState(0)
  const [deployStage, setDeployStage] = useState("")
  const [isDeploying, setIsDeploying] = useState(false)
  const [analysis, setAnalysis] = useState<string | null>(null)
  const [suggestions, setSuggestions] = useState<string[] | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const initiative = initiatives.find((i) => i.id === selectedInitiative)

  if (!initiative) return null

  const plan = initiative.executionPlan

  // Calculate a random progress value between 10-90%
  const progress = Math.floor(Math.random() * 80) + 10

  const handleDeployInitiative = () => {
    setIsDeployDialogOpen(false)
    setIsDeploying(true)

    // Simulate deployment process
    const stages = [
      "Initializing deployment...",
      "Setting up communication channels...",
      "Assigning team members...",
      "Creating task assignments...",
      "Sending partner notifications...",
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
          title: "Initiative Deployed",
          description: `${initiative.name} has been deployed and is now active.`,
          variant: "success",
        })
        setIsDeploying(false)
      }
    }, 1000)
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(plan.partnerEmail.body)
    toast({
      title: "Email Copied",
      description: "Partner outreach email has been copied to clipboard.",
    })
  }

  const handleCopyKickoff = () => {
    navigator.clipboard.writeText(plan.kickoffMessage)
    toast({
      title: "Message Copied",
      description: "Kickoff message has been copied to clipboard.",
    })
  }

  const handleSendEmail = () => {
    toast({
      title: "Email Sent",
      description: `Email has been sent to ${initiative.partners[0]}.`,
    })
  }

  const handlePostToSlack = () => {
    toast({
      title: "Posted to Slack",
      description: "Kickoff message has been posted to the team channel.",
    })
  }

  const handleScheduleKickoff = () => {
    toast({
      title: "Kickoff Scheduled",
      description: "Team kickoff meeting has been scheduled for next Monday at 10am.",
    })
  }

  const handlePrintPlan = () => {
    toast({
      title: "Printing Plan",
      description: "Sending execution plan to printer.",
    })
  }

  const handleSharePlan = () => {
    toast({
      title: "Plan Shared",
      description: "Execution plan has been shared with the team.",
    })
  }

  const handleConnectTool = (toolName: string) => {
    toast({
      title: "Tool Connected",
      description: `${toolName} has been connected to this initiative.`,
    })
  }

  const handleGenerateDetailedPlan = (phaseName: string) => {
    toast({
      title: "Generating Detailed Plan",
      description: `Creating detailed plan for ${phaseName} phase.`,
    })
  }

  const handleAssignTask = (taskName: string) => {
    toast({
      title: "Task Assignment",
      description: `Opening assignment dialog for "${taskName}"`,
    })
  }

  const handleAnalyzeInitiative = async () => {
    if (isAnalyzing) return

    setIsAnalyzing(true)
    try {
      const analysisResult = await analyzeInitiative(initiative)
      setAnalysis(analysisResult)

      const suggestionsResult = await suggestImprovements(initiative)
      setSuggestions(suggestionsResult)
    } catch (error) {
      console.error("Error analyzing initiative:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleManageTeam = () => {
    toast({
      title: "Team Management",
      description: "Opening team management interface.",
    })
  }

  const handleAutoAssignTasks = () => {
    toast({
      title: "Tasks Auto-Assigned",
      description: "AI has automatically assigned tasks to team members based on skills and availability.",
    })
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex justify-between items-start">
              <div>
                <DialogTitle className="text-xl">{initiative.name}</DialogTitle>
                <DialogDescription>
                  Complete roadmap and resources for implementing this CSR initiative
                </DialogDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2" onClick={handleSharePlan}>
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
                <Button variant="outline" size="sm" className="gap-2" onClick={handlePrintPlan}>
                  <Printer className="h-4 w-4" />
                  Print
                </Button>
                <Button
                  size="sm"
                  className="gap-2 bg-emerald-600 hover:bg-emerald-700"
                  onClick={() => setIsDeployDialogOpen(true)}
                  disabled={isDeploying}
                >
                  {isDeploying ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Deploying...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Deploy
                    </>
                  )}
                </Button>
              </div>
            </div>
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
              <div className="grid grid-cols-3 gap-4 my-4">
                <Card>
                  <CardContent className="p-4 flex flex-col items-center justify-center">
                    <p className="text-3xl font-bold text-emerald-600">{initiative.partners.length}</p>
                    <p className="text-sm text-slate-600 text-center">Partners</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex flex-col items-center justify-center">
                    <p className="text-3xl font-bold text-emerald-600">{plan.roadmap.length}</p>
                    <p className="text-sm text-slate-600 text-center">Phases</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex flex-col items-center justify-center">
                    <p className="text-3xl font-bold text-emerald-600">{progress}%</p>
                    <p className="text-sm text-slate-600 text-center">Progress</p>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="roadmap" className="mt-4">
                <TabsList className="grid grid-cols-6 mb-4">
                  <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
                  <TabsTrigger value="tools">Tools</TabsTrigger>
                  <TabsTrigger value="partner">Partner Email</TabsTrigger>
                  <TabsTrigger value="kickoff">Internal Kickoff</TabsTrigger>
                  <TabsTrigger value="team">Team</TabsTrigger>
                  <TabsTrigger value="analysis">Analysis</TabsTrigger>
                </TabsList>

                <TabsContent value="roadmap" className="space-y-4">
                  <div className="space-y-4">
                    {plan.roadmap.map((phase, index) => (
                      <Card key={index}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-base">{phase.name}</CardTitle>
                            <Badge variant="outline" className="bg-slate-50">
                              <Clock className="mr-1 h-3 w-3" /> {phase.timeline}
                            </Badge>
                          </div>
                          <CardDescription>{phase.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {phase.tasks.map((task, taskIndex) => (
                              <li key={taskIndex} className="flex items-start gap-2">
                                <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                                <div className="flex-1">
                                  <p className="font-medium text-sm">{task.name}</p>
                                  <div className="flex items-center justify-between mt-1">
                                    <Badge variant="outline" className="text-xs bg-slate-50">
                                      <User2 className="mr-1 h-3 w-3" /> {task.owner}
                                    </Badge>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-6 text-xs"
                                      onClick={() => handleAssignTask(task.name)}
                                    >
                                      Assign
                                    </Button>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                        <CardFooter>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            onClick={() => handleGenerateDetailedPlan(phase.name)}
                          >
                            <FileText className="h-4 w-4" />
                            Generate Detailed Plan
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="tools">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Recommended Tools & Integrations</CardTitle>
                      <CardDescription>Software and platforms to help manage this initiative</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4">
                        {plan.tools.map((tool, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="h-10 w-10 rounded bg-slate-100 flex items-center justify-center text-slate-700">
                              {tool.name.charAt(0)}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium">{tool.name}</p>
                                  <p className="text-sm text-slate-600">{tool.purpose}</p>
                                </div>
                                <Button variant="outline" size="sm" onClick={() => handleConnectTool(tool.name)}>
                                  Connect
                                </Button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="gap-2 w-full">
                        <Plus className="h-4 w-4" />
                        Add Custom Integration
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="partner">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Partner Outreach Email</CardTitle>
                      <CardDescription>Template for initial contact with {initiative.partners[0]}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="border rounded-md p-4 bg-slate-50 dark:bg-slate-900">
                        <p className="text-sm mb-2">
                          <strong>Subject:</strong> Partnership Opportunity: {initiative.name}
                        </p>
                        <div className="space-y-2 text-sm">
                          <p>Dear {initiative.partners[0]} Team,</p>
                          <p>{plan.partnerEmail.body}</p>
                          <p>
                            We would welcome the opportunity to discuss this initiative further and explore how we might
                            collaborate to create meaningful impact.
                          </p>
                          <p>
                            Best regards,
                            <br />
                            CSR Team
                            <br />
                            Acme Corp
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end gap-2">
                        <Button variant="outline" className="gap-2" onClick={handleCopyEmail}>
                          <Clipboard className="h-4 w-4" />
                          Copy Email
                        </Button>
                        <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700" onClick={handleSendEmail}>
                          <Mail className="h-4 w-4" />
                          Send Email
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="kickoff">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Internal Kickoff Message</CardTitle>
                      <CardDescription>Announcement to share with your team</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="border rounded-md p-4 bg-slate-50 dark:bg-slate-900">
                        <div className="space-y-2 text-sm">
                          <p>@channel</p>
                          <p>
                            <strong>Exciting News: Launching {initiative.name}</strong>
                          </p>
                          <p>{plan.kickoffMessage}</p>
                          <p>
                            Our first planning meeting is scheduled for next Monday at 10am. Calendar invites to follow.
                          </p>
                          <p>Looking forward to making a difference together!</p>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end gap-2">
                        <Button variant="outline" className="gap-2" onClick={handleScheduleKickoff}>
                          <Calendar className="h-4 w-4" />
                          Schedule Kickoff
                        </Button>
                        <Button variant="outline" className="gap-2" onClick={handleCopyKickoff}>
                          <Clipboard className="h-4 w-4" />
                          Copy Message
                        </Button>
                        <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700" onClick={handlePostToSlack}>
                          <MessageSquare className="h-4 w-4" />
                          Post to Slack
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="team">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Virtual Team Assignment</CardTitle>
                      <CardDescription>AI-powered team members assigned to this initiative</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4">
                        <li className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src="/professional-woman-headshot.png" />
                            <AvatarFallback>SM</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">Sarah Miller</p>
                                <p className="text-sm text-slate-600">CSR Program Manager</p>
                              </div>
                              <Badge>Lead</Badge>
                            </div>
                          </div>
                        </li>
                        <li className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src="/professional-man-headshot.png" />
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">James Davis</p>
                                <p className="text-sm text-slate-600">Community Outreach Specialist</p>
                              </div>
                              <Badge variant="outline">Member</Badge>
                            </div>
                          </div>
                        </li>
                        <li className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src="/diverse-professional-woman-headshots.png" />
                            <AvatarFallback>AW</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">Aisha Washington</p>
                                <p className="text-sm text-slate-600">Data Analyst</p>
                              </div>
                              <Badge variant="outline">Member</Badge>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm" className="gap-2" onClick={handleManageTeam}>
                        <User2 className="h-4 w-4" />
                        Manage Team
                      </Button>
                      <Button
                        size="sm"
                        className="gap-2 bg-emerald-600 hover:bg-emerald-700"
                        onClick={handleAutoAssignTasks}
                      >
                        <Sparkles className="h-4 w-4" />
                        Auto-Assign Tasks
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="analysis">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-base">Initiative Analysis</CardTitle>
                          <CardDescription>AI-powered insights and recommendations</CardDescription>
                        </div>
                        {!analysis && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            onClick={handleAnalyzeInitiative}
                            disabled={isAnalyzing}
                          >
                            {isAnalyzing ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Analyzing...
                              </>
                            ) : (
                              <>
                                <Sparkles className="h-4 w-4" />
                                Analyze Initiative
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      {analysis ? (
                        <div className="space-y-6">
                          <div className="prose prose-sm max-w-none">
                            <div className="whitespace-pre-line">{analysis}</div>
                          </div>

                          {suggestions && suggestions.length > 0 && (
                            <div>
                              <h3 className="text-base font-medium mb-2">Improvement Suggestions</h3>
                              <ul className="space-y-2">
                                {suggestions.map((suggestion, index) => (
                                  <li key={index} className="flex items-start gap-2">
                                    <div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 flex-shrink-0 mt-0.5">
                                      {index + 1}
                                    </div>
                                    <p className="text-sm">{suggestion}</p>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div className="flex justify-end">
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-2"
                              onClick={() => {
                                toast({
                                  title: "Analysis Downloaded",
                                  description: "Initiative analysis has been downloaded as a PDF.",
                                })
                              }}
                            >
                              <Download className="h-4 w-4" />
                              Download Analysis
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="py-8 text-center">
                          {isAnalyzing ? (
                            <div className="flex flex-col items-center gap-4">
                              <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
                              <p className="text-slate-600">Analyzing initiative and generating insights...</p>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-4">
                              <AlertCircle className="h-12 w-12 text-slate-300" />
                              <div>
                                <p className="text-slate-600 mb-1">No analysis available yet</p>
                                <p className="text-sm text-slate-500">
                                  Click "Analyze Initiative" to generate AI-powered insights and recommendations
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeployDialogOpen} onOpenChange={setIsDeployDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deploy Initiative</AlertDialogTitle>
            <AlertDialogDescription>
              This will activate the initiative, assign team members, and send notifications to all stakeholders. Are
              you ready to proceed?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeployInitiative} className="bg-emerald-600 hover:bg-emerald-700">
              Deploy Initiative
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
