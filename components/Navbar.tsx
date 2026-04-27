"use client"

import Link from "next/link"
import { supabase } from "@/lib/supabaseClient"

export default function Navbar() {
  async function logout() {
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  return (
    <div className="sticky top-0 z-50 bg-[#020617]/80 backdrop-blur border-b border-white/10">

      <div className="max-w-[1400px] mx-auto flex justify-between items-center px-6 md:px-12 py-4">

        {/* LOGO */}
        <Link href="/" className="font-semibold text-lg">
          🚀 Career OS
        </Link>

        {/* MENU */}
        <div className="flex gap-6 text-sm items-center">

          <Link href="/">Home</Link>
          <Link href="/control">Dashboard</Link>
          <Link href="/control/jobs">Jobs</Link>
          <Link href="/control/jobs?tab=applied">Applied</Link>
          <Link href="/hire-me">Hire Me</Link>

          <a href="https://n8n.jobhuntingaiagent.me" target="_blank">n8n</a>
          <a href="https://aijobhuntingdashboard.retool.com" target="_blank">Retool</a>

          <button
            onClick={logout}
            className="bg-red-500 px-3 py-1 rounded"
          >
            Logout
          </button>

        </div>

      </div>
    </div>
  )
}
