"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts"

// ✅ Next-Level: TypeScript Interfaces
interface Job {
  id: string;
  company: string;
  title: string;
  score: number;
}

interface ChartsProps {
  jobs: Job[];
}

// 🔥 Premium Custom Tooltip for Recharts
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="glass bg-[#0f172a]/90 backdrop-blur-xl p-4 border border-white/10 shadow-2xl rounded-xl">
        <h4 className="text-white font-bold text-sm mb-1">{data.company}</h4>
        <p className="text-gray-400 text-xs mb-3 truncate max-w-[200px]">{data.title}</p>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">AI Match</span>
          <span className="text-lg font-black text-white">{data.score}/100</span>
        </div>
      </div>
    );
  }
  return null;
};

export default function Charts({ jobs = [] }: ChartsProps) {
  // Enrich the data payload so the tooltip has access to the company and title
  const data = jobs.map((j, i) => ({
    name: i,
    score: typeof j.score === 'number' ? j.score : 0,
    company: j.company || "Unknown Company",
    title: j.title || "Unknown Role"
  }))

  return (
    <div className="mb-8 glass bg-white/5 p-6 rounded-2xl border border-white/10 animate-fade-in group">
      
      {/* Header section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-lg">
            📊
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Match Score Trend</h2>
            <p className="text-xs text-gray-400">AI analysis of your recent pipeline</p>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {data.length === 0 ? (
        <div className="h-[250px] w-full flex items-center justify-center border border-white/5 border-dashed rounded-xl">
          <p className="text-gray-500 text-sm">Not enough data to generate trends.</p>
        </div>
      ) : (
        /* 🔥 Upgraded Chart Area */
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              
              {/* Subtle background grid */}
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              
              {/* Cleaned up axes */}
              <XAxis 
                dataKey="name" 
                hide 
              />
              <YAxis 
                stroke="rgba(255,255,255,0.2)" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
                domain={[0, 100]}
              />
              
              {/* Injecting our custom tooltip */}
              <Tooltip 
                content={<CustomTooltip />} 
                cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }}
              />
              
              {/* Glowing animated line */}
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#6366f1" /* Indigo-500 */
                strokeWidth={3}
                dot={{ r: 4, fill: "#0f172a", stroke: "#6366f1", strokeWidth: 2 }}
                activeDot={{ r: 6, fill: "#6366f1", stroke: "#fff", strokeWidth: 2 }}
                animationDuration={1500}
                animationEasing="ease-in-out"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}