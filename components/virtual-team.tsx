"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Sparkles, MessageSquare, Calendar, Plus, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useStore } from "@/lib/store"

export function VirtualTeam() {
  const { initiatives } = useStore()

  const virtualTeamMembers = [
    {
      id: "tm1",
      name: "Sarah Miller",
      role: "CSR Program Manager",
      avatar: "/placeholder.svg?key=4q8lj",
      skills: ["Project Management", "Stakeholder Relations", "Strategic Planning"],
      bio: "Sarah specializes in developing and implementing comprehensive CSR strategies. With her expertise in project management, she ensures initiatives stay on track and meet their objectives.",
      workload: 85,
      initiatives: initiatives.slice(0, 2).map((i) => i.name),
    },
    {
      id: "tm2",
      name: "James Davis",
      role: "Community Outreach Specialist",
      avatar: "/placeholder.svg?key=nbp23",
      skills: ["Partnership Development", "Event Planning", "Communications"],
      bio: "James excels at building relationships with community partners and organizing impactful events. He brings a personal touch to all communications and ensures partners feel valued.",
      workload: 65,
      initiatives: initiatives.slice(1, 3).map((i) => i.name),
    },
    {
      id: "tm3",
      name: "Aisha Washington",
      role: "Data Analyst",
      avatar: "/placeholder.svg?key=jdx6k",
      skills: ["Impact Measurement", "Reporting", "Data Visualization"],
      bio: "Aisha transforms raw data into meaningful insights. She develops metrics to measure initiative success and creates compelling visualizations for stakeholder reports.",
      workload: 70,
      initiatives: initiatives.slice(0, 1).map((i) => i.name),
    },
    {
      id: "tm4",
      name: "Michael Chen",
      role: "Sustainability Expert",
      avatar: "/placeholder.svg?key=4v1qa",
      skills: ["Environmental Assessment", "Carbon Footprint Analysis", "Green Initiatives"],
      bio: "Michael brings specialized knowledge in environmental sustainability. He evaluates the ecological impact of initiatives and recommends strategies to reduce carbon footprints.",
      workload: 50,
      initiatives: initiatives.slice(2, 3).map((i) => i.name),
    },
    {
      id: "tm5",
      name: "Elena Rodriguez",
      role: "Communications Specialist",
      avatar: "/placeholder.svg?key=4ldk1",
      skills: ["Content Creation", "Social Media", "PR Strategy"],
      bio: "Elena crafts compelling narratives around CSR initiatives. She develops content strategies that amplify impact and manages social media presence to engage stakeholders.",
      workload: 75,
      initiatives: initiatives.slice(1, 2).map((i) => i.name),
    },
  ]

  if (initiatives.length === 0) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Virtual CSR Team</CardTitle>
              <CardDescription>Your AI-powered CSR department</CardDescription>
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
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Virtual CSR Team</h1>
        <Button asChild variant="outline" size="sm" className="gap-2">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Team Overview</CardTitle>
            <CardDescription>Your AI-powered CSR department members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {virtualTeamMembers.map((member) => (
                <div key={member.id} className="flex flex-col sm:flex-row gap-4 pb-6 border-b last:border-0 last:pb-0">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-semibold">{member.name}</h3>
                        <p className="text-sm text-slate-600">{member.role}</p>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {member.skills.map((skill, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm mt-2">{member.bio}</p>

                    <div className="mt-3 space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-medium">Current Workload</span>
                        <span className="text-slate-600">{member.workload}%</span>
                      </div>
                      <Progress value={member.workload} className="h-2" />
                    </div>

                    {member.initiatives.length > 0 && (
                      <div className="mt-3">
                        <p className="text-sm font-medium mb-1">Assigned Initiatives:</p>
                        <div className="flex flex-wrap gap-1">
                          {member.initiatives.map((initiative, i) => (
                            <Badge key={i} className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
                              {initiative}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Team Member
            </Button>
            <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700">
              <Sparkles className="h-4 w-4" />
              Auto-Optimize Team
            </Button>
          </CardFooter>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Capacity</CardTitle>
              <CardDescription>Current workload distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Overall Capacity</span>
                    <span className="font-medium">69%</span>
                  </div>
                  <Progress value={69} className="h-2" />
                </div>

                <div className="pt-2 space-y-3">
                  {virtualTeamMembers.map((member) => (
                    <div key={member.id} className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between text-xs">
                          <span className="truncate">{member.name}</span>
                          <span>{member.workload}%</span>
                        </div>
                        <Progress value={member.workload} className="h-1.5 mt-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team Actions</CardTitle>
              <CardDescription>Quick team management</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start gap-2">
                <MessageSquare className="h-4 w-4" />
                Schedule Team Meeting
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Calendar className="h-4 w-4" />
                View Team Calendar
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Sparkles className="h-4 w-4" />
                Reassign Tasks
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Activity</CardTitle>
          <CardDescription>Recent actions and updates from your virtual team</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="grid w-full max-w-md grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="meetings">Meetings</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <div className="mt-4 space-y-4">
              <div className="flex gap-4 pb-4 border-b">
                <div className="flex flex-col items-center">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={virtualTeamMembers[0].avatar || "/placeholder.svg"} />
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>
                  <div className="w-px h-full bg-slate-200 my-2" />
                </div>
                <div>
                  <p className="font-medium">{virtualTeamMembers[0].name} completed a task</p>
                  <p className="text-sm text-slate-600">
                    Finalized partnership agreement with {initiatives[0]?.partners[0]}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">Today, 10:23 AM</p>
                </div>
              </div>

              <div className="flex gap-4 pb-4 border-b">
                <div className="flex flex-col items-center">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={virtualTeamMembers[2].avatar || "/placeholder.svg"} />
                    <AvatarFallback>AW</AvatarFallback>
                  </Avatar>
                  <div className="w-px h-full bg-slate-200 my-2" />
                </div>
                <div>
                  <p className="font-medium">{virtualTeamMembers[2].name} generated a report</p>
                  <p className="text-sm text-slate-600">Monthly impact metrics for {initiatives[0]?.name}</p>
                  <p className="text-xs text-slate-500 mt-1">Yesterday, 4:45 PM</p>
                </div>
              </div>

              <div className="flex gap-4 pb-4 border-b">
                <div className="flex flex-col items-center">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={virtualTeamMembers[1].avatar || "/placeholder.svg"} />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="w-px h-full bg-slate-200 my-2" />
                </div>
                <div>
                  <p className="font-medium">{virtualTeamMembers[1].name} scheduled a meeting</p>
                  <p className="text-sm text-slate-600">Kickoff meeting for {initiatives[1]?.name}</p>
                  <p className="text-xs text-slate-500 mt-1">Yesterday, 2:30 PM</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={virtualTeamMembers[4].avatar || "/placeholder.svg"} />
                    <AvatarFallback>ER</AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <p className="font-medium">{virtualTeamMembers[4].name} drafted a communication</p>
                  <p className="text-sm text-slate-600">Social media announcement for {initiatives[1]?.name}</p>
                  <p className="text-xs text-slate-500 mt-1">2 days ago, 11:15 AM</p>
                </div>
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
