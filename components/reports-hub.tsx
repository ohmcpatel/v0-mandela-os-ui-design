"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReportSlide } from "@/components/report-slide"
import { useStore } from "@/lib/store"
import {
  FileText,
  Download,
  Share2,
  Presentation,
  Plus,
  ArrowLeft,
  Calendar,
  FileBarChart2,
  Sparkles,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

export function ReportsHub() {
  const { initiatives } = useStore()
  const [isGenerating, setIsGenerating] = useState(false)
  const [reportType, setReportType] = useState("quarterly")
  const { toast } = useToast()

  const handleGenerateReport = () => {
    setIsGenerating(true)

    setTimeout(() => {
      setIsGenerating(false)
      toast({
        title: "Report Generated",
        description: "Your CSR impact report has been generated successfully.",
      })
    }, 2000)
  }

  if (initiatives.length === 0) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Reports Hub</CardTitle>
              <CardDescription>Generate and manage CSR reports</CardDescription>
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
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Reports Hub</h1>
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
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
              <div>
                <CardTitle>Generate New Report</CardTitle>
                <CardDescription>Create professional CSR reports for stakeholders</CardDescription>
              </div>
              <div className="flex gap-2">
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Report Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quarterly">Quarterly Report</SelectItem>
                    <SelectItem value="annual">Annual Report</SelectItem>
                    <SelectItem value="executive">Executive Summary</SelectItem>
                    <SelectItem value="stakeholder">Stakeholder Update</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  onClick={handleGenerateReport}
                  disabled={isGenerating}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="slide" className="mt-2">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="slide">Slide</TabsTrigger>
                <TabsTrigger value="data">Data</TabsTrigger>
                <TabsTrigger value="narrative">Narrative</TabsTrigger>
              </TabsList>

              <div className="bg-white rounded-lg shadow-sm border p-6 mt-4">
                <ReportSlide initiatives={initiatives} reportType={reportType} />
              </div>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-xs text-slate-500">
              Last generated: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Download
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Presentation className="h-4 w-4" />
                Present
              </Button>
            </div>
          </CardFooter>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Report Schedule</CardTitle>
              <CardDescription>Upcoming and recurring reports</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 pb-3 border-b">
                <Calendar className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Quarterly Report</p>
                  <p className="text-sm text-slate-600">Due in 14 days</p>
                </div>
              </div>
              <div className="flex items-start gap-3 pb-3 border-b">
                <Calendar className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Board Update</p>
                  <p className="text-sm text-slate-600">Due in 30 days</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Annual Impact Report</p>
                  <p className="text-sm text-slate-600">Due in 90 days</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full gap-2">
                <Plus className="h-4 w-4" />
                Add Report Schedule
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Report Templates</CardTitle>
              <CardDescription>Pre-designed report formats</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 pb-3 border-b">
                <FileBarChart2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Executive Dashboard</p>
                  <p className="text-sm text-slate-600">Concise metrics for leadership</p>
                </div>
              </div>
              <div className="flex items-start gap-3 pb-3 border-b">
                <FileBarChart2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Comprehensive Impact</p>
                  <p className="text-sm text-slate-600">Detailed metrics and narratives</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileBarChart2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Stakeholder Presentation</p>
                  <p className="text-sm text-slate-600">Visual slides for external sharing</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full gap-2">
                <Plus className="h-4 w-4" />
                Create Custom Template
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Report History</CardTitle>
          <CardDescription>Previously generated reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 rounded-md border">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Q1 2023 CSR Impact Report</p>
                  <p className="text-sm text-slate-600">Generated on April 15, 2023</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  View
                </Button>
                <Button variant="outline" size="sm">
                  Download
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 rounded-md border">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Annual CSR Report 2022</p>
                  <p className="text-sm text-slate-600">Generated on January 10, 2023</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  View
                </Button>
                <Button variant="outline" size="sm">
                  Download
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 rounded-md border">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Executive Summary: Green Initiatives</p>
                  <p className="text-sm text-slate-600">Generated on December 5, 2022</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  View
                </Button>
                <Button variant="outline" size="sm">
                  Download
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
