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

// ✅ Next-Level: TypeScript Interfaces
interface Job {
  id: string;
  company: string;
  title: string;
  score: number;
  applied: boolean;
  [key: string]: any;
}

// 🔥 Premium Custom Tooltip for Recharts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass bg-[#0f172a]/95 backdrop-blur-xl p-4 border border-white/10 shadow-2xl rounded-xl min-w-[150px]">
        <h4 className="text-white font-bold text-sm mb-2 pb-2 border-b border-white/10">{label || payload[0].name}</h4>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex justify-between items-center gap-4 text-sm mt-1">
            <span className="text-gray-400 capitalize">{entry.name}:</span>
            <span className="font-black" style={{ color: entry.color }}>
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchJobs()
  }, [])

  async function fetchJobs() {
    const { data } = await supabase.from("jobs").select("*").order("created_at", { ascending: false })
    setJobs(data || [])
    setLoading(false)
  }

  // 🔥 Next-Level: Dashboard Skeleton Loader
  if (loading) {
    return (
      <div className="space-y-10 animate-fade-in w-full">
        <div>
          <div className="h-10 w-64 bg-white/5 rounded-xl animate-pulse mb-3"></div>
          <div className="h-4 w-96 bg-white/5 rounded-md animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => <div key={i} className="h-32 bg-white/5 rounded-2xl animate-pulse"></div>)}
        </div>
        <div className="h-48 bg-white/5 rounded-2xl animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((i) => <div key={i} className="h-[350px] bg-white/5 rounded-2xl animate-pulse"></div>)}
        </div>
      </div>
    )
  }

  // KPIs
  const totalJobs = jobs.length
  const applied = jobs.filter(j => j.applied).length
  const conversion = totalJobs > 0 ? ((applied / totalJobs) * 100).toFixed(1) : "0.0"

  // Chart Data Preparation
  const chartData = jobs.slice(0, 15).map((j) => ({
    name: j.company?.slice(0, 12) || "Unknown",
    score: j.score || 0,
  })).reverse() // Reverse so chronological order flows left-to-right on charts

  // Company Distribution
  const companyMap: Record<string, number> = {}
  jobs.forEach(j => {
    const comp = j.company || "Unknown"
    companyMap[comp] = (companyMap[comp] || 0) + 1
  })
  const companyData = Object.keys(companyMap)
    .map(c => ({ name: c, count: companyMap[c] }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  // AI Suggestions
  const suggestions = [...jobs]
    .filter(j => !j.applied)
    .sort((a, b) => (b.score || 0) - (a.score || 0))
    .slice(0, 3)

  return (
    <div className="space-y-12 animate-fade-in pb-10">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-2 flex items-center gap-3">
          <span className="bg-indigo-500/20 text-indigo-400 p-2 rounded-xl text-2xl shadow-[0_0_15px_rgba(99,102,241,0.2)]">📊</span>
          Command Center
        </h1>
        <p className="text-gray-400 text-sm md:text-base max-w-2xl">
          Track performance, optimize applications, and monitor your hiring pipeline conversion rates.
        </p>
      </div>

      {/* 🔥 KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="group relative overflow-hidden glass bg-white/5 p-6 border border-white/10 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/30">
          <div className="absolute -inset-2 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-xl">🎯</div>
            <div>
              <p className="text-gray-400 text-sm font-medium">Total Sourced</p>
              <h2 className="text-3xl font-black text-white">{totalJobs}</h2>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden glass bg-white/5 p-6 border border-white/10 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-green-500/30">
          <div className="absolute -inset-2 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-xl">🚀</div>
            <div>
              <p className="text-gray-400 text-sm font-medium">Applied</p>
              <h2 className="text-3xl font-black text-green-400">{applied}</h2>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden glass bg-white/5 p-6 border border-white/10 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30">
          <div className="absolute -inset-2 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-xl">📈</div>
            <div>
              <p className="text-gray-400 text-sm font-medium">Conversion</p>
              <h2 className="text-3xl font-black text-blue-400">{conversion}%</h2>
            </div>
          </div>
        </div>
      </div>

      {/* 🔥 AI INSIGHTS PANEL */}
      {suggestions.length > 0 && (
        <div className="relative group">
          <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-2xl opacity-30 group-hover:opacity-60 blur-sm transition-opacity duration-500"></div>
          <div className="relative bg-[#0f172a]/90 border border-white/10 p-6 rounded-2xl backdrop-blur-xl">
            <h2 className="text-lg mb-4 font-bold flex items-center gap-2">
              <span className="animate-pulse text-xl">✨</span> 
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">AI Top Targets</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-4">
              {suggestions.map((job, i) => (
                <div key={i} className="bg-white/5 border border-white/5 p-4 rounded-xl flex flex-col justify-between hover:bg-white/10 transition-colors">
                  <div>
                    <p className="text-sm font-bold text-white truncate">{job.company}</p>
                    <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{job.title}</p>
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-[10px] font-bold px-2 py-1 bg-green-500/10 text-green-400 rounded-md border border-green-500/20">
                      Score: {job.score}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 🔥 CHARTS GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* LINE CHART */}
        <div className="glass bg-white/5 border border-white/10 p-6 rounded-2xl">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-white">Recent Score Trend</h2>
            <p className="text-xs text-gray-400">Match scores of your latest sourced jobs</p>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer>
              <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} domain={[0, 100]} />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)' }} />
                <Line type="monotone" dataKey="score" name="AI Score" stroke="#6366f1" strokeWidth={3} dot={{ r: 4, fill: "#0f172a", stroke: "#6366f1", strokeWidth: 2 }} activeDot={{ r: 6, fill: "#6366f1", stroke: "#fff" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* BAR CHART: SCORE */}
        <div className="glass bg-white/5 border border-white/10 p-6 rounded-2xl">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-white">Score Comparison</h2>
            <p className="text-xs text-gray-400">Direct visual comparison of recent opportunities</p>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer>
              <BarChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} domain={[0, 100]} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                <Bar dataKey="score" name="Match Score" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* PIE CHART -> DONUT CHART */}
        <div className="glass bg-white/5 border border-white/10 p-6 rounded-2xl">
          <div className="mb-2">
            <h2 className="text-lg font-bold text-white">Pipeline Quality</h2>
            <p className="text-xs text-gray-400">Distribution of job match scores</p>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={[
                    { name: "High Fit (>80)", value: jobs.filter(j => j.score > 80).length },
                    { name: "Medium Fit (51-80)", value: jobs.filter(j => j.score > 50 && j.score <= 80).length },
                    { name: "Low Fit (≤50)", value: jobs.filter(j => j.score <= 50).length },
                  ]}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={70}  /* Turns it into a beautiful donut chart */
                  outerRadius={100}
                  stroke="none"
                >
                  <Cell fill="#10b981" /> {/* Green */}
                  <Cell fill="#eab308" /> {/* Yellow */}
                  <Cell fill="#ef4444" /> {/* Red */}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* COMPANY DISTRIBUTION */}
        <div className="glass bg-white/5 border border-white/10 p-6 rounded-2xl">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-white">Top Targeted Companies</h2>
            <p className="text-xs text-gray-400">Where you are sourcing the most jobs</p>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer>
              <BarChart data={companyData} layout="vertical" margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                <XAxis type="number" stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis dataKey="name" type="category" stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} width={80} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                <Bar dataKey="count" name="Jobs Sourced" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  )
}