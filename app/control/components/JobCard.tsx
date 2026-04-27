"use client"

import { useState } from "react"

// ✅ Next-Level: TypeScript definitions
interface Recruiter {
  id: string;
  name: string;
  company: string;
  email?: string;
}

interface JobCardProps {
  job: any; // Ideally replace with your strict Job interface
  setJobs: React.Dispatch<React.SetStateAction<any>>;
  recruiters?: Recruiter[];
}

export default function JobCard({ job, setJobs, recruiters = [] }: JobCardProps) {
  const [reason, setReason] = useState<string | null>(null)
  const [isScoring, setIsScoring] = useState(false)

  // Improved priority styling
  function getPriorityInfo(score: number) {
    if (score >= 90) return { label: "High", icon: "🔥", classes: "bg-orange-500/10 text-orange-400 border-orange-500/20" }
    if (score >= 80) return { label: "Medium", icon: "⚡", classes: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" }
    return { label: "Normal", icon: "📌", classes: "bg-blue-500/10 text-blue-400 border-blue-500/20" }
  }

  async function apply() {
    try {
      // Optimistic UI Update (instant visual feedback)
      setJobs((prev: any) =>
        prev.map((j: any) =>
          j.id === job.id ? { ...j, applied: true, applied_at: new Date().toISOString() } : j
        )
      )

      await fetch("/api/click", {
        method: "POST",
        body: JSON.stringify({ id: job.id }),
      })

      if (job.url) {
        window.open(job.url, "_blank")
      }

      await fetch("/api/apply", {
        method: "POST",
        body: JSON.stringify(job),
      })

    } catch (err) {
      console.error("Apply failed:", err)
      // Note: In a production app, you'd revert the optimistic update here if it failed
    }
  }

  async function assignRecruiter(recruiterId: string) {
    // Instant local update
    setJobs((prev: any) =>
      prev.map((j: any) =>
        j.id === job.id ? { ...j, recruiter_id: recruiterId } : j
      )
    )

    await fetch("/api/update-job", {
      method: "POST",
      body: JSON.stringify({
        id: job.id,
        recruiter_id: recruiterId
      })
    })
  }

  async function fetchReason() {
    if (reason) {
      setReason(null) // Toggle off if already open
      return
    }

    setIsScoring(true)
    try {
      const res = await fetch("/api/gpt-score", {
        method: "POST",
        body: JSON.stringify({ job })
      })
      const data = await res.json()
      setReason(data.reason)
    } finally {
      setIsScoring(false)
    }
  }

  const recruiter = recruiters.find((r) => r.id === job.recruiter_id)
  const isFollowUpDue = job.follow_up_date && new Date(job.follow_up_date) <= new Date()
  const priority = getPriorityInfo(job.success_score || job.score || 0)

  return (
    <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 rounded-2xl p-5 transition-all duration-300 hover:shadow-2xl hover:shadow-black/50 flex flex-col gap-4">
      
      {/* 🔹 Follow-up Warning Badge (Absolute positioned on top right) */}
      {isFollowUpDue && (
        <div className="absolute -top-3 -right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg shadow-red-500/20 animate-bounce flex items-center gap-1 z-10">
          <span>⚠️</span> Follow-up Due
        </div>
      )}

      {/* 🔹 Header: Company & Status */}
      <div className="flex justify-between items-start gap-2">
        <div>
          <p className="text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">{job.company}</p>
          <h2 className="text-lg font-bold text-white leading-tight line-clamp-2">{job.title}</h2>
        </div>
        <span className={`shrink-0 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
            job.applied ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-white/5 text-gray-400 border-white/10"
          }`}
        >
          {job.applied ? "Applied" : "New"}
        </span>
      </div>

      {/* 🔹 Metrics Row */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-black/20 rounded-lg p-2 border border-white/5 flex flex-col items-center justify-center">
          <span className="text-[10px] text-gray-500 mb-0.5">Match Score</span>
          <span className="text-sm font-bold text-green-400">{job.score || "—"}</span>
        </div>
        <div className="bg-black/20 rounded-lg p-2 border border-white/5 flex flex-col items-center justify-center">
          <span className="text-[10px] text-gray-500 mb-0.5">Success Rate</span>
          <span className="text-sm font-bold text-purple-400">{job.success_score || "—"}</span>
        </div>
        <div className={`rounded-lg p-2 border flex flex-col items-center justify-center ${priority.classes}`}>
          <span className="text-[10px] opacity-70 mb-0.5">Priority</span>
          <span className="text-xs font-bold flex items-center gap-1">
            {priority.icon} {priority.label}
          </span>
        </div>
      </div>

      {/* 🔹 Recruiter & AI Section */}
      <div className="flex flex-col gap-3 bg-white/[0.02] p-3 rounded-xl border border-white/5">
        
        {/* Recruiter Dropdown */}
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400 text-xs">
            👤
          </div>
          <select
            value={job.recruiter_id || ""}
            onChange={(e) => assignRecruiter(e.target.value)}
            className="w-full bg-black/40 border border-white/10 text-xs text-gray-300 py-2 pl-8 pr-8 rounded-lg appearance-none focus:outline-none focus:border-blue-500/50 hover:bg-black/60 transition-colors cursor-pointer"
          >
            <option value="">Assign Recruiter...</option>
            {recruiters.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name} {r.company ? `(${r.company})` : ""}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500">
            ▼
          </div>
        </div>

        {/* AI Insight Toggle */}
        <div>
          <button
            onClick={fetchReason}
            className="group/btn flex items-center gap-2 text-xs font-medium text-purple-400 hover:text-purple-300 transition-colors w-full"
          >
            <span className="bg-purple-500/20 p-1 rounded group-hover/btn:bg-purple-500/30 transition-colors">✨</span>
            {reason ? "Hide AI Analysis" : "Why this score?"}
          </button>

          {/* AI Response Panel */}
          {(isScoring || reason) && (
            <div className="mt-3 p-3 bg-indigo-950/30 border border-indigo-500/20 rounded-lg text-sm text-indigo-100/80 relative overflow-hidden">
              {isScoring ? (
                <div className="flex items-center gap-2 animate-pulse">
                  <div className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-xs">Analyzing job fit...</span>
                </div>
              ) : (
                <div className="whitespace-pre-wrap font-sans text-xs leading-relaxed">
                  {reason}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 🔹 Tracking Footer */}
      {(job.clicked_at || job.applied_at) && (
        <div className="flex justify-between items-center text-[10px] text-gray-500 pt-2 border-t border-white/10">
          {job.clicked_at && <span>👁 Viewed: {new Date(job.clicked_at).toLocaleDateString()}</span>}
          {job.applied_at && <span className="text-green-500/70">✅ Applied: {new Date(job.applied_at).toLocaleDateString()}</span>}
        </div>
      )}

      {/* 🔹 Action Buttons */}
      <div className="grid grid-cols-2 gap-2 mt-2">
        {!job.applied ? (
          <button
            onClick={apply}
            className="col-span-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-bold py-2.5 rounded-lg shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            🚀 Apply Now
          </button>
        ) : (
          <button
            disabled
            className="col-span-2 bg-green-500/10 text-green-500 border border-green-500/20 text-sm font-bold py-2.5 rounded-lg cursor-not-allowed flex items-center justify-center gap-2"
          >
            ✅ Application Sent
          </button>
        )}

        {job.url && (
          <a
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white text-xs font-semibold py-2 rounded-lg transition-colors flex items-center justify-center"
          >
            View Job
          </a>
        )}

        {recruiter?.email ? (
          <a
            href={`mailto:${recruiter.email}`}
            className="bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-400 text-xs font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-1"
          >
            ✉️ Email
          </a>
        ) : (
          <div className="bg-white/5 border border-white/5 text-gray-600 text-xs font-semibold py-2 rounded-lg flex items-center justify-center cursor-not-allowed">
            No Email
          </div>
        )}
      </div>

    </div>
  )
}