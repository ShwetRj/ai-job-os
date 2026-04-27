"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

import Analytics from "./components/Analytics"
import Charts from "./components/Charts"
import AISuggestions from "./components/AISuggestions"

export default function Dashboard() {
  const [jobs, setJobs] = useState<any[]>([])

  useEffect(() => {
    fetchJobs()
  }, [])

  async function fetchJobs() {
    const { data } = await supabase
      .from("jobs")
      .select("*")
      .gte("score", 70)

    setJobs(data || [])
  }

  return (
    <div className="min-h-screen p-6 md:p-10 text-white">
      <h1 className="text-4xl font-bold mb-8">
        🚀 Dashboard
      </h1>

      <Analytics jobs={jobs} />
      <AISuggestions jobs={jobs} />
      <Charts jobs={jobs} />
    </div>
  )
}
