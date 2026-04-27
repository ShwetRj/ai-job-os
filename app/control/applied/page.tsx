"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function AppliedPage() {
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchJobs()
  }, [])

  async function fetchJobs() {
    const { data } = await supabase
      .from("jobs")
      .select("*")
      .eq("applied", true)
      .order("created_at", { ascending: false })

    setJobs(data || [])
    setLoading(false)
  }

  if (loading) {
    return <div className="text-center mt-10">Loading applied jobs...</div>
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">

      <h1 className="text-4xl font-bold">✅ Applied Jobs</h1>

      {jobs.length === 0 && (
        <p className="text-gray-400">No applications yet</p>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition"
          >
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-gray-400">{job.company}</p>

            <div className="mt-3 flex justify-between items-center">
              <span className="text-green-400 font-semibold">
                Applied ✅
              </span>

              <span className="text-sm text-gray-400">
                Score: {job.score || "N/A"}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
