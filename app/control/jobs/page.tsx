import { Suspense } from "react"
import AuthWrapper from "@/components/AuthWrapper"
import JobsPage from "./page.client"

export default function Page() {
  return (
    <AuthWrapper>
      <div className="w-full">
        <Suspense fallback={<p className="text-center mt-10">Loading jobs...</p>}>
          <JobsPage />
        </Suspense>
      </div>
    </AuthWrapper>
  )
}