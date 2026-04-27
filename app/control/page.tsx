import AuthWrapper from "@/components/AuthWrapper"
import Dashboard from "./page.client"
import { Metadata } from "next"

// 🔥 Next-Level: Premium Browser Tab Metadata
export const metadata: Metadata = {
  title: "Command Center | Career OS",
  description: "Track your job hunting pipeline, monitor conversion rates, and review AI insights.",
}

export default function Page() {
  return (
    <AuthWrapper>
      {/* w-full and h-full ensure the dashboard spans perfectly across the responsive grid */}
      <div className="w-full h-full">
        <Dashboard />
      </div>
    </AuthWrapper>
  )
}