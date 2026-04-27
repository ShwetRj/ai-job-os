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
    <div className="text-center space-y-10">

      <h1 className="text-5xl font-bold">
        🚀 Stop Blind Job Applying
      </h1>

      <p className="text-gray-400 max-w-2xl mx-auto">
        Identify high-fit roles, automate outreach, and track recruiter responses.
      </p>

      {/* CONDITIONAL CTA */}
      {user ? (
        <Link
          href="/control"
          className="bg-green-500 px-6 py-3 rounded"
        >
          Go to Dashboard
        </Link>
      ) : (
        <div className="flex justify-center gap-4">
          <Link href="/login" className="border px-6 py-3 rounded">
            Login
          </Link>
          <Link href="/signup" className="bg-blue-600 px-6 py-3 rounded">
            Signup
          </Link>
        </div>
      )}

      {/* FEATURES */}
      <div className="grid md:grid-cols-3 gap-6 mt-10">

        <div className="p-6 bg-white/5 rounded-xl">
          🎯 AI Job Scoring
        </div>

        <div className="p-6 bg-white/5 rounded-xl">
          ⚡ Auto Apply
        </div>

        <div className="p-6 bg-white/5 rounded-xl">
          📊 CRM Tracking
        </div>

      </div>

    </div>
  )
}
