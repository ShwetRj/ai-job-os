import AuthWrapper from "@/components/AuthWrapper"
import Dashboard from "./page.client"

export default function Page() {
  return (
    <AuthWrapper>
      <div className="w-full">
        <Dashboard />
      </div>
    </AuthWrapper>
  )
}