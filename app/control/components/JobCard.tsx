"use client"

export default function JobCard({ job, setJobs }: any) {

  function getPriority(score: number) {
    if (score >= 90) return "🔥 High"
    if (score >= 80) return "⚡ Medium"
    return "Normal"
  }

  async function apply() {
    try {
      // 🔥 Track click
      await fetch("/api/click", {
        method: "POST",
        body: JSON.stringify({ id: job.id }),
      })

      // 🔥 Open job page
      if (job.url) {
        window.open(job.url, "_blank")
      }

      // 🔥 Apply (trigger n8n + DB update)
      await fetch("/api/apply", {
        method: "POST",
        body: JSON.stringify(job),
      })

      // 🔥 Update UI instantly
      setJobs((prev: any) =>
        prev.map((j: any) =>
          j.id === job.id ? { ...j, applied: true } : j
        )
      )

    } catch (err) {
      console.error("Apply failed:", err)
    }
  }

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 mb-4 hover:shadow-xl hover:scale-[1.01] transition-all">

      {/* 🔹 Title */}
      <h2 className="text-xl font-semibold">{job.title}</h2>

      {/* 🔹 Company */}
      <p className="text-gray-400">{job.company}</p>

      {/* 🔹 Meta */}
      <div className="flex gap-4 mt-3 text-sm items-center flex-wrap">

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

        {/* 🔥 Priority */}
        <span className="px-2 py-1 text-xs rounded-full bg-yellow-500/20 text-yellow-400">
          {getPriority(job.success_score || job.score)}
        </span>

        {/* 🔥 Status */}
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

      {/* 🔹 Tracking Info */}
      <div className="mt-2 text-xs text-gray-400 space-y-1">
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
      <div className="mt-5 flex gap-3">

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
      </div>
    </div>
  )
}
