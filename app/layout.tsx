import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Toaster } from "@/components/ui/toaster"
import { AIProvider } from "@/components/ai-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MandelaOS - Autonomous CSR Department",
  description: "An agentic operating system that builds and runs CSR departments for companies",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AIProvider>
            <SidebarProvider>
              <div className="flex h-screen w-full">
                <AppSidebar />
                <div className="flex-1 flex flex-col h-screen w-full overflow-hidden">{children}</div>
              </div>
              <Toaster />
            </SidebarProvider>
          </AIProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
