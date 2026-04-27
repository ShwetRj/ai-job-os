"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

const columns = ["New", "Contacted", "Interview", "Closed"]

export default function CRM() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    const { data } = await supabase
      .from("recruiter_crm")
      .select("*")
      .order("created_at", { ascending: false })

    setData(data || [])
  }

  async function updateStatus(id: string, status: string) {
    await supabase
      .from("recruiter_crm")
      .update({ status })
      .eq("id", id)

    fetchData()
  }

  async function markContacted(id: string) {
    await supabase
      .from("recruiter_crm")
      .update({
        last_contacted: new Date().toISOString(),
        next_follow_up: new Date(
          Date.now() + 3 * 24 * 60 * 60 * 1000
        ),
        status: "Contacted"
      })
      .eq("id", id)

    fetchData()
  }

  const followUps = data.filter(
    (r) =>
      r.next_follow_up &&
      new Date(r.next_follow_up) <= new Date()
  )

  return (
    <div className="space-y-10">

      <h1 className="text-4xl font-bold">📇 Recruiter CRM</h1>

      {/* 🔥 KPI */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white/5 p-4 rounded">
          Total: {data.length}
        </div>
        <div className="bg-white/5 p-4 rounded text-yellow-400">
          Follow-ups Due: {followUps.length}
        </div>
        <div className="bg-white/5 p-4 rounded text-green-400">
          Active: {data.filter(r => r.status === "Interview").length}
        </div>
      </div>

      {/* 🔥 KANBAN */}
      <div className="grid md:grid-cols-4 gap-6">

        {columns.map((col) => (
          <div
            key={col}
            className="bg-white/5 p-4 rounded-xl min-h-[400px]"
          >
            <h2 className="mb-4 font-semibold">{col}</h2>

            {data
              .filter((r) => r.status === col)
              .map((r) => {

                const isFollowUpDue =
                  r.next_follow_up &&
                  new Date(r.next_follow_up) <= new Date()

                return (
                  <div
                    key={r.id}
                    className="bg-black/40 p-4 mb-3 rounded space-y-2"
                  >
                    <b>{r.name}</b>
                    <p className="text-sm text-gray-400">
                      {r.company}
                    </p>

                    {/* EMAIL */}
                    {r.email && (
                      <a
                        href={`mailto:${r.email}`}
                        className="text-xs text-blue-400 underline"
                      >
                        📧 Email
                      </a>
                    )}

                    {/* FOLLOW-UP ALERT */}
                    {isFollowUpDue && (
                      <div className="text-xs bg-red-500/20 p-2 rounded">
                        ⚠ Follow-up due
                      </div>
                    )}

                    {/* ACTIONS */}
                    <div className="space-y-2">

                      <button
                        onClick={() => markContacted(r.id)}
                        className="w-full bg-blue-500 py-1 rounded text-xs"
                      >
                        Contacted
                      </button>

                      <select
                        value={r.status}
                        onChange={(e) =>
                          updateStatus(r.id, e.target.value)
                        }
                        className="w-full bg-black/50 text-xs p-1 rounded"
                      >
                        {columns.map((c) => (
                          <option key={c}>{c}</option>
                        ))}
                      </select>

                    </div>

                  </div>
                )
              })}
          </div>
        ))}

      </div>

    </div>
  )
}