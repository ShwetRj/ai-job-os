import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { calculateSuccessScore } from "@/lib/intelligence"

// 🔐 Supabase (server-side)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST() {
  try {
    // 🔥 1. Fetch jobs
    const { data: jobs, error } = await supabase
      .from("jobs")
      .select("*")

    if (error) {
      console.error("❌ Fetch error:", error)
      return NextResponse.json({ success: false, error })
    }

    if (!jobs || jobs.length === 0) {
      return NextResponse.json({ success: true, message: "No jobs found" })
    }

    console.log(`⚡ Scoring ${jobs.length} jobs...`)

    // 🔥 2. Compute + update in parallel
    const updates = jobs.map(async (job) => {
      const successScore = calculateSuccessScore(job)

      const { error: updateError } = await supabase
        .from("jobs")
        .update({ success_score: successScore })
        .eq("id", job.id)

      if (updateError) {
        console.error(`❌ Failed job ${job.id}`, updateError)
      }

      return { id: job.id, successScore }
    })

    await Promise.all(updates)

    console.log("✅ Scoring completed")

    return NextResponse.json({
      success: true,
      total: jobs.length,
    })

  } catch (err) {
    console.error("🔥 Scoring API error:", err)

    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    )
  }
}
