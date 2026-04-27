"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import Link from "next/link"

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

  // 🔥 Next-Level: Skeleton Loader
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white flex items-center gap-3">
          <span className="bg-white/5 p-2 rounded-xl text-2xl animate-pulse">⏳</span>
          Loading History...
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-40 bg-white/5 animate-pulse rounded-2xl border border-white/10"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">

      {/* 🔥 Header with Metric Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white flex items-center gap-3">
          <span className="bg-green-500/20 text-green-400 p-2 rounded-xl text-2xl shadow-[0_0_15px_rgba(34,197,94,0.2)]">✅</span>
          Applied Jobs
        </h1>
        <div className="text-sm font-medium text-gray-400 bg-white/5 px-4 py-2 rounded-full border border-white/10 inline-flex items-center gap-2 self-start sm:self-auto">
          Total Applications: <span className="text-white font-bold">{jobs.length}</span>
        </div>
      </div>

      {/* 🔥 Premium Empty State */}
      {jobs.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center glass bg-white/5 border border-white/10 rounded-2xl">
          <div className="text-6xl mb-4 opacity-50">📭</div>
          <h3 className="text-xl font-bold text-white mb-2">No applications yet</h3>
          <p className="text-gray-400 max-w-md mb-6">
            Your applied jobs will appear here automatically once you start moving them through your pipeline.
          </p>
          <Link href="/control/jobs" className="btn text-white">
            Go to Pipeline →
          </Link>
        </div>
      )}

      {/* 🔥 Upgraded Grid & Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => {
          // Dynamic color for the AI score
          const scoreColor = job.score >= 80 ? 'text-green-400 bg-green-500/10 border-green-500/20' 
                           : job.score >= 60 ? 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' 
                           : 'text-red-400 bg-red-500/10 border-red-500/20';

          return (
            <div
              key={job.id}
              className="group relative overflow-hidden glass bg-white/5 p-6 border border-white/10 hover:border-green-500/30 rounded-2xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Subtle hover gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4 gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors line-clamp-2">
                      {job.title}
                    </h2>
                    <p className="text-gray-400 font-medium text-sm mt-1 truncate">
                      {job.company}
                    </p>
                  </div>
                  
                  {/* AI Score Badge */}
                  <div className={`shrink-0 px-2.5 py-1 rounded-lg text-xs font-bold border ${scoreColor}`}>
                    ✨ {job.score || "N/A"}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 bg-white/5 px-2.5 py-1 rounded-md">
                    🗓 {new Date(job.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  
                  <span className="text-xs font-bold text-green-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                    Applied
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}