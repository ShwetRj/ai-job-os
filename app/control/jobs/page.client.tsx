"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([])
  const pathname = usePathname()

  // 🔥 Determine view from URL
  const view =
    pathname.includes("applied") ? "applied" :
    pathname.includes("crm") ? "crm" :
    "new"

  // 🔥 Fetch jobs
  async function fetchJobs() {
    let query = supabase
      .from("jobs")
      .select("*")
      .gte("score", 70)
      .order("score", { ascending: false })

    const { data } = await query
    setJobs(data || [])
  }

  useEffect(() => {
    fetchJobs()

    // 🔥 Real-time updates
    const channel = supabase
      .channel("jobs-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "jobs" },
        () => {
          fetchJobs()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  // 🔥 Filter based on route
  const filteredJobs = jobs.filter((job) => {
    if (view === "applied") return job.applied
    if (view === "crm") return job.recruiter_email
    return !job.applied
  })

  // 🔥 Apply function
  async function apply(job: any) {
    try {
      // Track click
      await fetch("/api/click", {
        method: "POST",
        body: JSON.stringify({ id: job.id }),
      })

      // Open job
      if (job.url) {
        window.open(job.url, "_blank")
      }

      // Apply
      await fetch("/api/apply", {
        method: "POST",
        body: JSON.stringify(job),
      })

      fetchJobs()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen p-6 md:p-10">

      {/* 🔥 HEADER */}
      <h1 className="text-3xl font-bold mb-6 capitalize">
        {view} Jobs
      </h1>

      {/* 🔥 EMPTY STATE */}
      {filteredJobs.length === 0 && (
        <p className="text-gray-400">No jobs found</p>
      )}

      {/* 🔥 JOB LIST */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 hover:scale-[1.01] transition"
          >

            {/* Title */}
            <h2 className="text-lg font-semibold">
              {job.title}
            </h2>

            {/* Company */}
            <p className="text-gray-400">
              {job.company}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap gap-3 mt-2 text-sm">

              <span>
                Score:{" "}
                <b className="text-green-400">
                  {job.score || "N/A"}
                </b>
              </span>

              <span>
                Success:{" "}
                <b className="text-purple-400">
                  {job.success_score || "N/A"}
                </b>
              </span>

              {/* Status */}
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  job.applied
                    ? "bg-green-500/20 text-green-400"
                    : "bg-gray-500/20 text-gray-400"
                }`}
              >
                {job.applied ? "Applied" : "New"}
              </span>
            </div>

            {/* Tracking */}
            <div className="text-xs text-gray-400 mt-2">
              {job.clicked_at && (
                <p>
                  👁 Viewed:{" "}
                  {new Date(job.clicked_at).toLocaleString()}
                </p>
              )}
              {job.applied_at && (
                <p>
                  ✅ Applied:{" "}
                  {new Date(job.applied_at).toLocaleString()}
                </p>
              )}
            </div>

            {/* AI Insights */}
            {job.ai_reason && (
              <p className="text-xs text-purple-300 mt-2">
                🤖 {job.ai_reason}
              </p>
            )}

            {/* Actions */}
            <div className="mt-4 flex gap-3">

              {!job.applied ? (
                <button
                  onClick={() => apply(job)}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 rounded-lg hover:scale-105 transition"
                >
                  🚀 Apply
                </button>
              ) : (
                <button
                  disabled
                  className="bg-green-600/70 px-4 py-2 rounded-lg"
                >
                  ✅ Applied
                </button>
              )}

              {job.url && (
                <a
                  href={job.url}
                  target="_blank"
                  className="border border-white/20 px-4 py-2 rounded-lg hover:bg-white/10"
                >
                  View Job
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
