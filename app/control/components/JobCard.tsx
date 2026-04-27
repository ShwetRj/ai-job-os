"use client"

import { useState } from "react"

export default function JobCard({ job, setJobs, recruiters = [] }: any) {
  const [reason, setReason] = useState<string | null>(null)

  function getPriority(score: number) {
    if (score >= 90) return "🔥 High"
    if (score >= 80) return "⚡ Medium"
    return "Normal"
  }

  async function apply() {
    try {
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

      setJobs((prev: any) =>
        prev.map((j: any) =>
          j.id === job.id ? { ...j, applied: true } : j
        )
      )

    } catch (err) {
      console.error("Apply failed:", err)
    }
  }

  async function assignRecruiter(recruiterId: string) {
    await fetch("/api/update-job", {
      method: "POST",
      body: JSON.stringify({
        id: job.id,
        recruiter_id: recruiterId
      })
    })
  }

  async function fetchReason() {
    const res = await fetch("/api/gpt-score", {
      method: "POST",
      body: JSON.stringify({ job })
    })

    const data = await res.json()
    setReason(data.reason)
  }

  const recruiter = recruiters.find(
    (r: any) => r.id === job.recruiter_id
  )

  const isFollowUpDue =
    job.follow_up_date &&
    new Date(job.follow_up_date) <= new Date()

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 mb-6 hover:shadow-xl hover:scale-[1.01] transition-all space-y-4">

      {/* 🔹 Title */}
      <div>
        <h2 className="text-xl font-semibold">{job.title}</h2>
        <p className="text-gray-400">{job.company}</p>
      </div>

      {/* 🔹 Meta */}
      <div className="flex gap-4 text-sm items-center flex-wrap">

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

        <span className="px-2 py-1 text-xs rounded-full bg-yellow-500/20 text-yellow-400">
          {getPriority(job.success_score || job.score)}
        </span>

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

      {/* 🔹 Recruiter Assign */}
      <div className="space-y-1">
        <select
          value={job.recruiter_id || ""}
          onChange={(e) => assignRecruiter(e.target.value)}
          className="w-full bg-black/50 text-xs p-2 rounded"
        >
          <option value="">Assign Recruiter</option>
          {recruiters.map((r: any) => (
            <option key={r.id} value={r.id}>
              {r.name} ({r.company})
            </option>
          ))}
        </select>

        {recruiter && (
          <div className="text-xs text-gray-400">
            👤 {recruiter.name}
          </div>
        )}
      </div>

      {/* 🔹 Follow-up Alert */}
      {isFollowUpDue && (
        <div className="text-xs bg-red-500/20 p-2 rounded">
          ⚠ Follow-up due
        </div>
      )}

      {/* 🔹 AI WHY PANEL */}
      <div className="text-xs">
        <button
          onClick={fetchReason}
          className="text-purple-400 underline"
        >
          Why this score?
        </button>

        {reason && (
          <div className="bg-white/5 p-2 mt-2 rounded text-gray-300">
            {reason}
          </div>
        )}
      </div>

      {/* 🔹 Tracking Info */}
      <div className="text-xs text-gray-400 space-y-1">
        {job.clicked_at && (
          <p>
            👁 Viewed: {new Date(job.clicked_at).toLocaleString()}
          </p>
        )}
        {job.applied_at && (
          <p>
            ✅ Applied: {new Date(job.applied_at).toLocaleString()}
          </p>
        )}
      </div>

      {/* 🔹 Actions */}
      <div className="flex gap-3 flex-wrap">

        {!job.applied ? (
          <button
            onClick={apply}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 px-5 py-2 rounded-lg shadow hover:scale-105 transition"
          >
            🚀 Apply
          </button>
        ) : (
          <button
            disabled
            className="bg-green-600/70 px-5 py-2 rounded-lg cursor-not-allowed"
          >
            ✅ Applied
          </button>
        )}

        {job.url && (
          <a
            href={job.url}
            target="_blank"
            className="border border-white/20 px-5 py-2 rounded-lg hover:bg-white/10 transition"
          >
            View Job
          </a>
        )}

        {recruiter?.email && (
          <a
            href={`mailto:${recruiter.email}`}
            className="border border-blue-400 px-5 py-2 rounded-lg text-blue-400 hover:bg-blue-400/10"
          >
            Email Recruiter
          </a>
        )}

      </div>

    </div>
  )
}