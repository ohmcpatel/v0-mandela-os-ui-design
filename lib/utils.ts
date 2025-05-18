import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractCompanyName(description: string): string | null {
  // Simple regex to find company names
  // This is a basic implementation - in a real app, you might use NLP or more sophisticated methods

  // Look for common patterns like "We are [Company]" or "[Company] is a..."
  const patterns = [
    /(?:we are|we're|I work for|I work at|I am with|I'm with|at)\s+([A-Z][A-Za-z0-9\s]+?)(?:,|\.|;|\s+(?:a|an|the|and|which|that|who|where))/i,
    /([A-Z][A-Za-z0-9\s]+?)(?:\s+is\s+a|\s+are\s+a)/i,
  ]

  for (const pattern of patterns) {
    const match = description.match(pattern)
    if (match && match[1]) {
      // Clean up the extracted name
      return match[1].trim()
    }
  }

  // If no company name is found, return null
  return null
}
