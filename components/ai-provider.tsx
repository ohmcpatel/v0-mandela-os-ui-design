"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import { generateInitiatives as generateDummyInitiatives } from "@/lib/dummy-data"
import type { Initiative } from "@/lib/types"
import { useToast } from "@/components/ui/use-toast"

interface AIContextType {
  isGenerating: boolean
  generateInitiatives: (companyDescription: string) => Promise<Initiative[]>
  generateReport: (initiatives: Initiative[], reportType: string) => Promise<string>
  analyzeInitiative: (initiative: Initiative) => Promise<string>
  suggestImprovements: (initiative: Initiative) => Promise<string[]>
}

const AIContext = createContext<AIContextType | undefined>(undefined)

export function AIProvider({ children }: { children: React.ReactNode }) {
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const generateInitiatives = async (companyDescription: string): Promise<Initiative[]> => {
    setIsGenerating(true)

    try {
      // In a production environment, this would call the OpenAI API
      // For now, we'll use a simulated delay and dummy data
      return new Promise((resolve) => {
        setTimeout(() => {
          const initiatives = generateDummyInitiatives(companyDescription)
          setIsGenerating(false)
          resolve(initiatives)
        }, 2000)
      })
    } catch (error) {
      setIsGenerating(false)
      console.error("Error generating initiatives:", error)
      toast({
        title: "Generation Error",
        description: "Failed to generate initiatives. Please try again.",
        variant: "destructive",
      })
      throw error
    }
  }

  const generateReport = async (initiatives: Initiative[], reportType: string): Promise<string> => {
    setIsGenerating(true)

    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          const report = `# ${reportType} CSR Impact Report\n\n## Executive Summary\n\nThis report summarizes the impact of our CSR initiatives for the current period. We've made significant progress across ${initiatives.length} key initiatives, engaging with ${initiatives.reduce((acc, init) => acc + init.partners.length, 0)} partner organizations and impacting thousands of community members.\n\n## Initiative Highlights\n\n${initiatives.map((i) => `### ${i.name}\n- Theme: ${i.theme}\n- Partners: ${i.partners.join(", ")}\n- Key Metrics: ${i.metrics.join(", ")}\n`).join("\n")}`
          setIsGenerating(false)
          resolve(report)
        }, 2000)
      })
    } catch (error) {
      setIsGenerating(false)
      console.error("Error generating report:", error)
      toast({
        title: "Report Generation Error",
        description: "Failed to generate the report. Please try again.",
        variant: "destructive",
      })
      throw error
    }
  }

  const analyzeInitiative = async (initiative: Initiative): Promise<string> => {
    setIsGenerating(true)

    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          const analysis = `## Initiative Analysis: ${initiative.name}\n\nThis initiative focuses on ${initiative.theme} with ${initiative.partners.length} partner organizations. The execution plan consists of ${initiative.executionPlan.roadmap.length} phases and aims to achieve metrics such as ${initiative.metrics.join(", ")}.\n\n### Strengths\n- Strong partner network\n- Clear metrics for measurement\n- Comprehensive execution plan\n\n### Areas for Improvement\n- Consider adding more specific timeline milestones\n- Expand stakeholder engagement strategies\n- Enhance impact measurement methodology`
          setIsGenerating(false)
          resolve(analysis)
        }, 1500)
      })
    } catch (error) {
      setIsGenerating(false)
      console.error("Error analyzing initiative:", error)
      toast({
        title: "Analysis Error",
        description: "Failed to analyze the initiative. Please try again.",
        variant: "destructive",
      })
      throw error
    }
  }

  const suggestImprovements = async (initiative: Initiative): Promise<string[]> => {
    setIsGenerating(true)

    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          const suggestions = [
            `Consider expanding ${initiative.name} to include additional metrics focused on long-term impact.`,
            `Add a digital engagement component to increase visibility and participation.`,
            `Develop a more detailed budget allocation plan for each phase of the initiative.`,
            `Create a feedback mechanism to gather input from beneficiaries and stakeholders.`,
            `Establish a quarterly review process to assess progress and make adjustments.`,
          ]
          setIsGenerating(false)
          resolve(suggestions)
        }, 1500)
      })
    } catch (error) {
      setIsGenerating(false)
      console.error("Error suggesting improvements:", error)
      toast({
        title: "Suggestion Error",
        description: "Failed to generate improvement suggestions. Please try again.",
        variant: "destructive",
      })
      throw error
    }
  }

  return (
    <AIContext.Provider
      value={{
        isGenerating,
        generateInitiatives,
        generateReport,
        analyzeInitiative,
        suggestImprovements,
      }}
    >
      {children}
    </AIContext.Provider>
  )
}

export function useAI() {
  const context = useContext(AIContext)
  if (context === undefined) {
    throw new Error("useAI must be used within an AIProvider")
  }
  return context
}
