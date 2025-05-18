import { InitiativesExplorer } from "@/components/initiatives-explorer"

export default function InitiativesPage() {
  return (
    <main className="flex-1 w-full overflow-auto bg-gradient-to-b from-slate-50 to-slate-100 p-6">
      <InitiativesExplorer />
    </main>
  )
}
