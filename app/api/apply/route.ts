import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// 🔐 Server-side Supabase (service role)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const job = await req.json()

    if (!job?.id) {
      return NextResponse.json(
        { success: false, error: "Missing job ID" },
        { status: 400 }
      )
    }

    // 🔥 1. Trigger n8n workflow
    try {
      await fetch(`${process.env.N8N_BASE_URL}/webhook/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(job),
      })
    } catch (err) {
      console.warn("⚠️ n8n trigger failed:", err)
    }

    // 🔥 2. Get current apply_count
    const { data: existing } = await supabase
      .from("jobs")
      .select("apply_count")
      .eq("id", job.id)
      .single()

    const currentCount = existing?.apply_count || 0

    // 🔥 3. Update job tracking
    const { error } = await supabase
      .from("jobs")
      .update({
        applied: true,
        applied_at: new Date().toISOString(),
        apply_method: "manual",
        apply_count: currentCount + 1,
        last_action: "applied",
      })
      .eq("id", job.id)

    if (error) {
      console.error("❌ Supabase update error:", error)
      return NextResponse.json(
        { success: false, error },
        { status: 500 }
      )
    }

    console.log("✅ Job applied + tracked:", job.id)

    return NextResponse.json({ success: true })

  } catch (err) {
    console.error("🔥 API error:", err)
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    )
  }
}
