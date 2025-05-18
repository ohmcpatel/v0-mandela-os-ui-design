import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

export const runtime = "nodejs"
export const maxDuration = 60

export async function POST(req: Request) {
  try {
    const { companyDescription } = await req.json()

    const prompt = `
      You are MandelaOS, an AI system that builds and runs CSR departments for companies.
      
      Based on the following company description, generate 3 detailed CSR initiatives:
      
      Company Description: ${companyDescription}
      
      For each initiative, include:
      1. A compelling name
      2. A CSR theme (e.g., sustainability, education, health)
      3. 2-3 potential partner organizations
      4. 3-4 key metrics or goals
      5. A detailed execution plan with:
         - Timeline broken into phases
         - Specific tasks and owners
         - Recommended tools and integrations
         - Draft partner outreach email
         - Internal kickoff message
      
      Format the response as a JSON object with an array of initiatives.
    `

    // For a real implementation, you would use the OpenAI API
    // This is a simplified example
    const result = streamText({
      model: openai("gpt-4o"),
      messages: [
        {
          role: "system",
          content: "You are MandelaOS, an AI system that builds and runs CSR departments for companies.",
        },
        { role: "user", content: prompt },
      ],
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: "Failed to generate initiatives" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
