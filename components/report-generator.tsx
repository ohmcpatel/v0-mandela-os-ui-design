"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useStore } from "@/lib/store"
import { ReportSlide } from "@/components/report-slide"
import { FileText, Download, Share2, Presentation, Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"

export function ReportGenerator() {
  const { initiatives } = useStore()
  const [reportGenerated, setReportGenerated] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [reportType, setReportType] = useState("quarterly")
  const { toast } = useToast()

  const handleGenerateReport = () => {
    if (initiatives.length === 0) return

    setIsGenerating(true)

    // Simulate report generation delay
    setTimeout(() => {
      setReportGenerated(true)
      setIsGenerating(false)

      toast({
        title: "Report Generated",
        description: "Your CSR impact report has been generated successfully.",
      })
    }, 2000)
  }

  const handleDownload = () => {
    toast({
      title: "Report Downloaded",
      description: "Your report has been downloaded as a PDF file.",
    })
  }

  if (initiatives.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Impact Report Generator</CardTitle>
          <CardDescription>Generate professional CSR reports for stakeholders</CardDescription>
        </CardHeader>
        <CardContent className="py-10 text-center">
          <p className="text-slate-500 mb-4">No initiatives yet. Generate initiatives first to create reports.</p>
          <Button variant="outline" disabled className="gap-2">
            <FileText className="h-4 w-4" />
            Generate Report
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Impact Report Generator</h2>
        <div className="flex items-center gap-2">
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
            disabled={isGenerating || initiatives.length === 0}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                Generate Report
              </>
            )}
          </Button>
        </div>
      </div>

      {reportGenerated && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>CSR Impact Report</CardTitle>
                <CardDescription>
                  {reportType === "quarterly" && "Quarterly summary of CSR initiatives and impact"}
                  {reportType === "annual" && "Annual overview of CSR achievements and metrics"}
                  {reportType === "executive" && "Executive summary for leadership team"}
                  {reportType === "stakeholder" && "Detailed update for external stakeholders"}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2" onClick={handleDownload}>
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
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="slide" className="mt-2">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="slide">Slide</TabsTrigger>
                <TabsTrigger value="data">Data</TabsTrigger>
                <TabsTrigger value="narrative">Narrative</TabsTrigger>
              </TabsList>

              <TabsContent value="slide">
                <div className="bg-white rounded-lg shadow-sm border p-6 mt-4">
                  <ReportSlide initiatives={initiatives} reportType={reportType} />
                </div>
              </TabsContent>

              <TabsContent value="data">
                <div className="bg-white rounded-lg shadow-sm border p-6 mt-4">
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold">Impact Metrics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {initiatives.map((initiative) => (
                        <Card key={initiative.id}>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">{initiative.name}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {initiative.metrics.map((metric, index) => (
                                <li key={index} className="flex justify-between">
                                  <span className="text-sm">{metric}</span>
                                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700">
                                    {Math.floor(Math.random() * 100)}% Complete
                                  </Badge>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="narrative">
                <div className="bg-white rounded-lg shadow-sm border p-6 mt-4">
                  <div className="prose max-w-none dark:prose-invert">
                    <h2>CSR Impact Narrative</h2>
                    <p>
                      This quarter, our CSR initiatives have made significant progress across multiple areas of focus.
                      We've established key partnerships with {initiatives.map((i) => i.partners[0]).join(", ")},
                      allowing us to extend our reach and impact in the communities we serve.
                    </p>

                    <h3>Key Achievements</h3>
                    <ul>
                      {initiatives.map((initiative, index) => (
                        <li key={index}>
                          <strong>{initiative.name}:</strong> {initiative.metrics[0]}
                        </li>
                      ))}
                    </ul>

                    <h3>Looking Forward</h3>
                    <p>
                      In the coming quarter, we plan to expand our initiatives further, with a particular focus on
                      measuring and quantifying our social impact. We're developing comprehensive metrics to better
                      track our progress and ensure our resources are allocated effectively.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-slate-500">
              Generated by MandelaOS • Last updated: {new Date().toLocaleDateString()}
            </p>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
