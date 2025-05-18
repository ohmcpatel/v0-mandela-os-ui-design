import { Dashboard } from "@/components/dashboard"

export default function Home() {
  return (
    <main className="flex-1 w-full overflow-auto bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Dashboard />
    </main>
  )
}
