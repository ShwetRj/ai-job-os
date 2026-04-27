import React from "react"

// ✅ Next-Level: TypeScript Interfaces
interface Job {
  id: string;
  applied: boolean;
  [key: string]: any;
}

interface AnalyticsProps {
  jobs: Job[];
}

export default function Analytics({ jobs = [] }: AnalyticsProps) {
  const total = jobs.length
  const applied = jobs.filter((j) => j.applied).length
  const conversion = total ? ((applied / total) * 100).toFixed(1) : "0.0"

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8 animate-fade-in">
      <Card 
        title="Total Sourced" 
        value={total} 
        icon="🎯" 
        theme="purple" 
      />
      <Card 
        title="Applications Sent" 
        value={applied} 
        icon="🚀" 
        theme="green" 
      />
      <Card 
        title="Apply Rate" 
        value={`${conversion}%`} 
        icon="📈" 
        theme="blue" 
      />
    </div>
  )
}

// 🔥 CRITICAL FIX: Explicit Tailwind classes (prevents purging in production)
const themes = {
  purple: {
    text: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "group-hover:border-purple-500/30",
    glow: "from-purple-500/10",
  },
  green: {
    text: "text-green-400",
    bg: "bg-green-500/10",
    border: "group-hover:border-green-500/30",
    glow: "from-green-500/10",
  },
  blue: {
    text: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "group-hover:border-blue-500/30",
    glow: "from-blue-500/10",
  },
}

interface CardProps {
  title: string;
  value: string | number;
  icon: string;
  theme: keyof typeof themes;
}

function Card({ title, value, icon, theme }: CardProps) {
  const styles = themes[theme]

  return (
    <div className={`group relative overflow-hidden glass bg-white/5 p-6 border border-white/10 rounded-2xl transition-all duration-300 hover:-translate-y-1 ${styles.border}`}>
      
      {/* Subtle hover background glow behind the card */}
      <div className={`absolute -inset-2 bg-gradient-to-br ${styles.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl z-0`}></div>
      
      <div className="relative z-10 flex flex-col h-full justify-between gap-4">
        
        {/* Card Header */}
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${styles.bg} ${styles.text}`}>
            {icon}
          </div>
          <p className="text-gray-400 font-medium text-sm tracking-wide">{title}</p>
        </div>
        
        {/* Metric Value */}
        <div>
          <h3 className={`text-4xl font-black tracking-tight ${styles.text} drop-shadow-sm`}>
            {value}
          </h3>
        </div>
        
      </div>
    </div>
  )
}