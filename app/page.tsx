"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function Home() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })
  }, [])

  return (
    <div className="flex flex-col items-center justify-center pt-10 md:pt-20 pb-16 space-y-16">

      {/* 🔥 HERO SECTION */}
      <div className="text-center space-y-8 max-w-4xl px-4 animate-fade-in">
        <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold tracking-wide">
          ✨ The Ultimate Job Hunting OS
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight text-white">
          Stop <span className="bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 bg-clip-text text-transparent">Blind Job Applying</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Take control of your career. Identify high-fit roles, automate your outreach, and track recruiter responses all in one powerful dashboard.
        </p>

        {/* 🔥 CONDITIONAL CTA */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
          {user ? (
            <Link
              href="/control"
              className="group relative px-8 py-4 bg-white text-gray-900 font-bold rounded-xl text-lg hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)]"
            >
              Go to Dashboard
              <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform">→</span>
            </Link>
          ) : (
            <>
              <Link 
                href="/login" 
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all text-lg"
              >
                Login
              </Link>
              <Link 
                href="/signup" 
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold bg-blue-600 text-white hover:bg-blue-500 transition-all text-lg shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:shadow-[0_0_50px_rgba(37,99,235,0.6)] hover:-translate-y-1"
              >
                Get Started Free
              </Link>
            </>
          )}
        </div>
      </div>

      {/* 🔥 FEATURES GRID */}
      <div className="grid md:grid-cols-3 gap-6 w-full max-w-6xl px-4 mt-12">
        
        <div className="group p-8 glass bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/30 rounded-2xl transition-all duration-300 hover:-translate-y-2">
          <div className="h-12 w-12 rounded-lg bg-blue-500/20 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
            🎯
          </div>
          <h3 className="text-xl font-bold text-white mb-3">AI Job Scoring</h3>
          <p className="text-gray-400 leading-relaxed text-sm">
            Instantly know if a job is worth your time. Our AI analyzes your profile against the job description to give you a match score.
          </p>
        </div>

        <div className="group p-8 glass bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/30 rounded-2xl transition-all duration-300 hover:-translate-y-2">
          <div className="h-12 w-12 rounded-lg bg-purple-500/20 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
            ⚡
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Auto Apply</h3>
          <p className="text-gray-400 leading-relaxed text-sm">
            Stop filling out the same forms. Connect with our automation layer to submit applications with unprecedented speed.
          </p>
        </div>

        <div className="group p-8 glass bg-white/5 hover:bg-white/10 border border-white/10 hover:border-green-500/30 rounded-2xl transition-all duration-300 hover:-translate-y-2">
          <div className="h-12 w-12 rounded-lg bg-green-500/20 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
            📊
          </div>
          <h3 className="text-xl font-bold text-white mb-3">CRM Tracking</h3>
          <p className="text-gray-400 leading-relaxed text-sm">
            Treat yourself like a business. Manage recruiters, track follow-ups, and move opportunities through a visual Kanban pipeline.
          </p>
        </div>

      </div>

    </div>
  )
}