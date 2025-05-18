"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useStore } from "@/lib/store"
import { ArrowLeft, Building2, Search, Plus, ExternalLink, Mail, MessageSquare, Calendar } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function PartnersNetwork() {
  const { initiatives } = useStore()

  // Extract all unique partners from initiatives
  const allPartners = initiatives.reduce((acc, initiative) => {
    initiative.partners.forEach((partner) => {
      if (!acc.some((p) => p.name === partner)) {
        acc.push({
          id: `partner-${Math.random().toString(36).substr(2, 9)}`,
          name: partner,
          logo: `/placeholder.svg?height=80&width=80&query=${encodeURIComponent(partner + " logo")}`,
          type: getPartnerType(partner),
          initiatives: [initiative.name],
          status: "Active",
          contactName: getRandomContactName(),
          contactEmail: `contact@${partner.toLowerCase().replace(/\s+/g, "")}.org`,
          website: `https://www.${partner.toLowerCase().replace(/\s+/g, "")}.org`,
          description: getPartnerDescription(partner),
        })
      } else {
        const existingPartner = acc.find((p) => p.name === partner)
        if (existingPartner && !existingPartner.initiatives.includes(initiative.name)) {
          existingPartner.initiatives.push(initiative.name)
        }
      }
    })
    return acc
  }, [] as any[])

  function getPartnerType(partnerName: string) {
    const types = ["Nonprofit", "NGO", "Foundation", "Community Organization", "Educational Institution"]
    // Simple deterministic assignment based on name length
    return types[partnerName.length % types.length]
  }

  function getRandomContactName() {
    const firstNames = ["John", "Sarah", "Michael", "Emma", "David", "Maria", "Robert", "Jennifer"]
    const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis"]
    return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`
  }

  function getPartnerDescription(partnerName: string) {
    const descriptions = [
      `${partnerName} is dedicated to creating positive social impact through collaborative initiatives and community engagement.`,
      `As a leading organization in their field, ${partnerName} brings expertise and resources to help achieve meaningful CSR outcomes.`,
      `${partnerName} works to address critical social and environmental challenges through innovative programs and partnerships.`,
      `With a strong track record of success, ${partnerName} helps organizations implement effective CSR strategies that align with their values.`,
      `${partnerName} specializes in developing sustainable solutions that benefit communities while advancing corporate social responsibility goals.`,
    ]
    // Simple deterministic assignment based on name length
    return descriptions[partnerName.length % descriptions.length]
  }

  if (initiatives.length === 0) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Partners Network</CardTitle>
              <CardDescription>Manage your CSR partner organizations</CardDescription>
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
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Partners Network</h1>
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
          <Input type="search" placeholder="Search partners by name, type, or initiative..." className="pl-9 w-full" />
        </div>
        <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700">
          <Plus className="h-4 w-4" />
          Add Partner
        </Button>
      </div>

      <Tabs defaultValue="grid" className="mb-6">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="map">Map View</TabsTrigger>
          </TabsList>
          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">{allPartners.length} Partners</Badge>
        </div>

        <TabsContent value="grid" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allPartners.map((partner) => (
              <Card key={partner.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12 rounded-md">
                        <AvatarImage src={partner.logo || "/placeholder.svg"} />
                        <AvatarFallback className="rounded-md bg-emerald-100 text-emerald-800">
                          {partner.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{partner.name}</CardTitle>
                        <CardDescription>{partner.type}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700">
                      {partner.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 mb-4">{partner.description}</p>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-600">{partner.contactEmail}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <ExternalLink className="h-4 w-4 text-slate-400" />
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-600 hover:text-emerald-600"
                      >
                        {partner.website.replace("https://", "")}
                      </a>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm font-medium mb-2">Initiatives:</p>
                    <div className="flex flex-wrap gap-1">
                      {partner.initiatives.map((initiative, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {initiative}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <Button variant="outline" size="sm" className="gap-1">
                    <MessageSquare className="h-3 w-3" />
                    Contact
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Calendar className="h-3 w-3" />
                    Schedule
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <ExternalLink className="h-3 w-3" />
                    Visit
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list" className="mt-6">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {allPartners.map((partner) => (
                  <div
                    key={partner.id}
                    className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 rounded-md">
                        <AvatarImage src={partner.logo || "/placeholder.svg"} />
                        <AvatarFallback className="rounded-md bg-emerald-100 text-emerald-800">
                          {partner.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{partner.name}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {partner.type}
                          </Badge>
                          <span className="text-xs text-slate-500">{partner.initiatives.length} initiatives</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Mail className="h-3 w-3" />
                        Contact
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="map" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="aspect-video bg-slate-100 rounded-md flex items-center justify-center">
                <div className="text-center">
                  <Building2 className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                  <p className="text-slate-600">Partner location map would be displayed here</p>
                  <p className="text-sm text-slate-500">Showing {allPartners.length} partner organizations</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Partner Engagement</CardTitle>
          <CardDescription>Recent and upcoming interactions with partners</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 pb-4 border-b">
              <Calendar className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Upcoming Meeting with {allPartners[0]?.name}</p>
                <p className="text-sm text-slate-600">Quarterly review of {allPartners[0]?.initiatives[0]}</p>
                <p className="text-xs text-slate-500 mt-1">Tomorrow, 10:00 AM</p>
              </div>
            </div>

            <div className="flex items-start gap-3 pb-4 border-b">
              <Mail className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Email Sent to {allPartners[1]?.name}</p>
                <p className="text-sm text-slate-600">Proposal for expanding {allPartners[1]?.initiatives[0]}</p>
                <p className="text-xs text-slate-500 mt-1">Yesterday, 2:45 PM</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MessageSquare className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">
                  Call with {allPartners[2]?.contactName} from {allPartners[2]?.name}
                </p>
                <p className="text-sm text-slate-600">Discussed potential new initiative</p>
                <p className="text-xs text-slate-500 mt-1">3 days ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
