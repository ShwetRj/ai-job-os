import { Suspense } from "react"
import AuthWrapper from "@/components/AuthWrapper"
import JobsPage from "./page.client"

// 🔥 Next-Level: Kanban Skeleton Loader
// This renders instantly on the server while the heavy drag-and-drop JS loads
function KanbanSkeleton() {
  return (
    <div className="space-y-8 animate-fade-in w-full h-full">
      
      {/* Header Skeleton */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-white/5 rounded-xl animate-pulse"></div>
        <div className="h-8 w-48 bg-white/5 rounded-lg animate-pulse"></div>
      </div>
      
      {/* Columns Skeleton */}
      <div className="flex gap-6 overflow-hidden">
        {[1, 2, 3, 4, 5].map((i) => (
          <div 
            key={i} 
            className="min-w-[320px] max-w-[350px] w-full h-[70vh] bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex flex-col gap-4"
          >
            {/* Column Title */}
            <div className="flex justify-between items-center mb-2">
              <div className="h-5 w-24 bg-white/10 rounded-md animate-pulse"></div>
              <div className="h-5 w-8 bg-white/10 rounded-full animate-pulse"></div>
            </div>

            {/* Mock Cards */}
            <div className="h-32 bg-white/5 rounded-xl animate-pulse"></div>
            <div className="h-32 bg-white/5 rounded-xl animate-pulse opacity-70"></div>
            <div className="h-32 bg-white/5 rounded-xl animate-pulse opacity-40"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <AuthWrapper>
      <div className="w-full h-full">
        <Suspense fallback={<KanbanSkeleton />}>
          <JobsPage />
        </Suspense>
      </div>
    </AuthWrapper>
  )
}