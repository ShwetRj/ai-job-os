import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// 🔐 Server-side Supabase (service role)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// ✅ Next-Level: Define expected payload for type safety
interface JobPayload {
  id: string;
  url: string;
  [key: string]: any; // Catch-all for other job data passed to n8n
}

export async function POST(req: Request) {
  try {
    const job: JobPayload = await req.json()

    // ✅ Basic validation
    if (!job?.id || !job?.url) {
      return NextResponse.json(
        { success: false, error: "Invalid job data: Missing ID or URL" },
        { status: 400 }
      )
    }

    // 🔥 1. Trigger n8n workflow (Upgraded: AbortController prevents memory leaks)
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3000)

    try {
      await fetch(`${process.env.N8N_BASE_URL}/webhook/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(job),
        signal: controller.signal // Injects the timeout signal
      })
    } catch (err: any) {
      if (err.name === 'AbortError') {
        console.warn("⚠️ n8n trigger timed out (3s limit reached, continuing anyway)")
      } else {
        console.warn("⚠️ n8n trigger failed:", err.message)
      }
    } finally {
      clearTimeout(timeoutId) // Clean up the timeout so it doesn't hang in memory
    }

    // 🔥 2. Get current apply_count
    const { data: existing, error: fetchError } = await supabase
      .from("jobs")
      .select("apply_count")
      .eq("id", job.id)
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.warn("⚠️ Could not fetch existing apply_count:", fetchError.message)
    }

    const currentCount = existing?.apply_count || 0

    // 🔥 3. Update job tracking
    const { error: updateError } = await supabase
      .from("jobs")
      .update({
        applied: true,
        applied_at: new Date().toISOString(),
        apply_method: "manual",
        apply_count: currentCount + 1,
        last_action: "applied",
      })
      .eq("id", job.id)

    if (updateError) {
      console.error("❌ Supabase update error:", updateError)
      return NextResponse.json(
        { success: false, error: "Database update failed" },
        { status: 500 }
      )
    }

    console.log(`✅ Job applied + tracked: ${job.id} (Total Applies: ${currentCount + 1})`)

    // Added the new count to the response so your UI can update optimistically if needed
    return NextResponse.json({ success: true, apply_count: currentCount + 1 })

  } catch (err) {
    console.error("🔥 API error:", err)
    return NextResponse.json(
      { success: false, error: "Server error processing request" },
      { status: 500 }
    )
  }
}