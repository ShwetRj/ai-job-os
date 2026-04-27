"use client"

import { useState } from "react"

export default function WhyScore({ job }: any) {
  const [reason, setReason] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function fetchReason() {
    try {
      setLoading(true)

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
      setReason("Error generating explanation")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="text-xs mt-2">

      <button
        onClick={fetchReason}
        className="text-purple-400 underline"
      >
        {loading ? "Loading..." : "Why this score?"}
      </button>

      {reason && (
        <div className="bg-white/5 p-2 mt-2 rounded text-gray-300 whitespace-pre-line">
          {reason}
        </div>
      )}

    </div>
  )
}