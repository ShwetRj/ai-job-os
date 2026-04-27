"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

import {
  LineChart, Line,
  BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts"

export default function Dashboard() {
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchJobs()
  }, [])

  async function fetchJobs() {
    const { data } = await supabase.from("jobs").select("*")
    setJobs(data || [])
    setLoading(false)
  }

  if (loading) {
    return <div className="text-center mt-10">Loading dashboard...</div>
  }

  // KPIs
  const totalJobs = jobs.length
  const applied = jobs.filter(j => j.applied).length
  const conversion =
    totalJobs > 0 ? ((applied / totalJobs) * 100).toFixed(1) : "0"

  // 🔥 REAL CHART DATA (NO MORE "Job 1")
  const chartData = jobs.slice(0, 20).map((j) => ({
    name: j.company?.slice(0, 10) || "Unknown",
    score: j.score || 0,
  }))

  // 🔥 COMPANY DISTRIBUTION
  const companyMap: any = {}
  jobs.forEach(j => {
    companyMap[j.company] = (companyMap[j.company] || 0) + 1
  })

  const companyData = Object.keys(companyMap).map(c => ({
    name: c,
    value: companyMap[c]
  })).slice(0, 5)

  // 🔥 AI Suggestions
  const suggestions = [...jobs]
    .sort((a, b) => (b.score || 0) - (a.score || 0))
    .slice(0, 3)

  return (
    <div className="space-y-14">

      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold mb-2">📊 Dashboard</h1>
        <p className="text-gray-400">
          Track performance, optimize applications, and improve your conversion rate
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur">
          <p className="text-gray-400">Total Jobs</p>
          <h2 className="text-3xl font-semibold">{totalJobs}</h2>
        </div>

        <div className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur">
          <p className="text-gray-400">Applied</p>
          <h2 className="text-3xl text-green-400 font-semibold">{applied}</h2>
        </div>

        <div className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur">
          <p className="text-gray-400">Conversion</p>
          <h2 className="text-3xl font-semibold">{conversion}%</h2>
        </div>

      </div>

      {/* AI INSIGHTS PANEL */}
      <div className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 border border-white/10 p-6 rounded-xl backdrop-blur">
        <h2 className="text-lg mb-3 font-semibold">🧠 AI Recommendations</h2>

        <div className="space-y-2 text-sm">
          {suggestions.map((job, i) => (
            <div key={i}>
              👉 Apply to <b>{job.company}</b> – {job.title} (Score: {job.score || 0})
            </div>
          ))}
        </div>
      </div>

      {/* CHARTS */}
      <div className="grid md:grid-cols-2 gap-8">

        {/* LINE */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
          <h2 className="mb-4 text-lg">📈 Score Trend</h2>

          <div className="h-[320px]">
            <ResponsiveContainer>
              <LineChart data={chartData}>
                <CartesianGrid stroke="#1f2937" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#3b82f6"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* BAR */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
          <h2 className="mb-4 text-lg">📊 Score Comparison</h2>

          <div className="h-[320px]">
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <CartesianGrid stroke="#1f2937" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />

                <Bar dataKey="score" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* PIE */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
          <h2 className="mb-4 text-lg">🧠 Score Distribution</h2>

          <div className="h-[320px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={[
                    { name: "High", value: jobs.filter(j => j.score > 80).length },
                    { name: "Medium", value: jobs.filter(j => j.score > 50 && j.score <= 80).length },
                    { name: "Low", value: jobs.filter(j => j.score <= 50).length },
                  ]}
                  dataKey="value"
                  outerRadius={100}
                >
                  <Cell fill="#22c55e" />
                  <Cell fill="#facc15" />
                  <Cell fill="#ef4444" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* COMPANY DISTRIBUTION */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
          <h2 className="mb-4 text-lg">🏢 Top Companies</h2>

          <div className="h-[320px]">
            <ResponsiveContainer>
              <BarChart data={companyData}>
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Bar dataKey="value" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  )
}