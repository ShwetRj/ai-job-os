"use client"

import { useState } from "react"

export default function WhyScore({ job }: { job: any }) {
  const [reason, setReason] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  async function fetchReason() {
    // If it's already open and we have a reason, just close it
    if (isOpen && reason) {
      setIsOpen(false)
      return
    }

    // If we already have a reason but it's closed, just open it
    if (reason) {
      setIsOpen(true)
      return
    }

    try {
      setLoading(true)
      setIsOpen(true)

      const res = await fetch("/api/gpt-score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ job }),
      })

      const data = await res.json()
      setReason(data.reason)
    } catch (err) {
      setReason("⚠️ Unable to generate AI explanation at this time.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-2 group/ai">
      {/* 🔥 THE TRIGGER BUTTON */}
      <button
        onClick={fetchReason}
        disabled={loading}
        className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider transition-all duration-200 ${
          isOpen ? "text-purple-300" : "text-purple-400/80 hover:text-purple-300"
        }`}
      >
        <span className={`flex items-center justify-center w-5 h-5 rounded-md bg-purple-500/10 border border-purple-500/20 group-hover/ai:scale-110 transition-transform ${loading ? "animate-pulse" : ""}`}>
          ✨
        </span>
        {loading ? "Analyzing Fit..." : (isOpen && reason ? "Hide Insight" : "Why this score?") }
      </button>

      {/* 🔥 THE INSIGHT PANEL */}
      {isOpen && (
        <div className="mt-3 relative animate-fade-in">
          {/* Subtle Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-md rounded-xl pointer-events-none"></div>
          
          <div className="relative glass bg-[#0f172a]/80 border border-purple-500/20 p-4 rounded-xl text-xs leading-relaxed text-gray-300 shadow-2xl">
            {loading ? (
              <div className="space-y-2 py-1">
                <div className="h-3 w-3/4 bg-white/5 rounded animate-pulse"></div>
                <div className="h-3 w-1/2 bg-white/5 rounded animate-pulse"></div>
                <div className="h-3 w-2/3 bg-white/5 rounded animate-pulse"></div>
              </div>
            ) : (
              <div className="prose prose-invert prose-xs">
                {/* Using whitespace-pre-line to respect the formatting from our 
                  upgraded API while keeping the text responsive.
                */}
                <div className="whitespace-pre-line text-[11px] font-medium leading-relaxed">
                  {reason}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}