"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useStore } from "@/lib/store"
import { Sparkles, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useAI } from "@/components/ai-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { extractCompanyName } from "@/lib/utils"

export function InputPanel() {
  const [companyDescription, setCompanyDescription] = useState("")
  const { setInitiatives, setCompanyName, setCompanyDescription: storeCompanyDescription } = useStore()
  const { toast } = useToast()
  const { isGenerating, generateInitiatives } = useAI()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!companyDescription.trim()) return

    try {
      // Extract company name from description for display
      const extractedName = extractCompanyName(companyDescription)
      if (extractedName) {
        setCompanyName(extractedName)
      }

      // Store the company description
      storeCompanyDescription(companyDescription)

      const newInitiatives = await generateInitiatives(companyDescription)
      setInitiatives(newInitiatives)

      toast({
        title: "CSR Department Built",
        description: "Your initiatives have been generated successfully.",
        variant: "success",
      })
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "There was an error building your CSR department. Please try again.",
        variant: "destructive",
      })
    }
  }

  const exampleDescriptions = [
    "We're a Series B fintech startup focused on financial inclusion for underserved communities. Our core values are transparency, accessibility, and sustainability.",
    "Acme Tech is a leading software development company with 500 employees across 3 countries. We specialize in AI solutions and prioritize ethical technology development.",
    "GreenLeaf Foods is an organic food producer committed to sustainable farming practices. We work with local farmers and aim to reduce our carbon footprint.",
  ]

  const handleUseExample = (example: string) => {
    setCompanyDescription(example)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Build Your CSR Department</CardTitle>
        <CardDescription>Describe your company to generate tailored CSR initiatives powered by AI</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Textarea
              placeholder="e.g., We're a Series B fintech startup focused on financial inclusion for underserved communities. Our core values are transparency, accessibility, and sustainability."
              className="min-h-[120px] resize-none"
              value={companyDescription}
              onChange={(e) => setCompanyDescription(e.target.value)}
            />
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="text-slate-500">Examples:</span>
              {exampleDescriptions.map((example, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleUseExample(example)}
                  className="text-emerald-600 hover:text-emerald-800 hover:underline"
                >
                  Example {index + 1}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-2">
              The more details you provide about your company's mission, values, industry, and stage, the more tailored
              your CSR initiatives will be.
            </p>
          </div>
          <Button
            type="submit"
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700"
            disabled={isGenerating || !companyDescription.trim()}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Building CSR Department...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Build CSR Department
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
