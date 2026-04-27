import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { calculateSuccessScore } from "@/lib/intelligence"

// 🔐 Supabase (server-side, elevated privileges)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// ⚡ Next-Level: Helper function to chunk arrays for safe processing
const chunkArray = <T>(array: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  )
}

export async function POST(req: Request) {
  try {
    // 🔥 1. Fetch jobs
    // PRO TIP: If you only want to score NEW jobs, you could add .is("success_score", null)
    const { data: jobs, error } = await supabase
      .from("jobs")
      .select("*")

    if (error) {
      console.error("❌ Fetch error:", error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    if (!jobs || jobs.length === 0) {
      return NextResponse.json({ success: true, message: "No jobs require scoring." })
    }

    console.log(`⚡ Scoring ${jobs.length} jobs...`)

    // 🔥 2. Compute scores in memory
    const jobsWithScores = jobs.map((job) => ({
      id: job.id,
      success_score: calculateSuccessScore(job)
    }))

    // 🔥 3. Bulk Update via Chunking (Prevents Supabase rate-limiting)
    const BATCH_SIZE = 50; 
    const chunks = chunkArray(jobsWithScores, BATCH_SIZE);
    
    let successCount = 0;
    let failCount = 0;

    for (const chunk of chunks) {
      // 🚀 Next-Level DB Optimization:
      // Using .upsert() allows us to update 50 rows in ONE network request instead of 50 separate .update() calls.
      const { error: batchError } = await supabase
        .from("jobs")
        .upsert(chunk, { onConflict: 'id' }) 
        
      if (batchError) {
         console.error(`❌ Batch update failed:`, batchError)
         failCount += chunk.length;
      } else {
         successCount += chunk.length;
      }
    }

    console.log(`✅ Scoring completed. Success: ${successCount}, Failed: ${failCount}`)

    return NextResponse.json({
      success: true,
      total_processed: jobs.length,
      successful_updates: successCount,
      failed_updates: failCount
    })

  } catch (err) {
    console.error("🔥 Scoring API error:", err)
    return NextResponse.json(
      { success: false, error: "Internal Server Error during bulk scoring" },
      { status: 500 }
    )
  }
}