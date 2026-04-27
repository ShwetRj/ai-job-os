import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// 🔐 Supabase (server-side, elevated privileges)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// ✅ Next-Level: Define allowed update fields to prevent malicious payload injection
const ALLOWED_FIELDS = [
  "recruiter_id",
  "status", 
  "score", 
  "applied", 
  "follow_up_date",
  "notes"
]

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { id, ...updates } = body

    // ✅ 1. Strict Validation
    if (!id) {
      return NextResponse.json(
        { success: false, error: "⚠️ Job ID is strictly required." },
        { status: 400 }
      )
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { success: false, error: "⚠️ No update data provided." },
        { status: 400 }
      )
    }

    // ✅ 2. Payload Sanitization (Only allow specific fields to be updated)
    const sanitizedData: Record<string, any> = {}
    for (const key of Object.keys(updates)) {
      if (ALLOWED_FIELDS.includes(key)) {
        sanitizedData[key] = updates[key]
      }
    }

    // 🔥 3. Execute Database Update
    const { error } = await supabase
      .from("jobs")
      .update(sanitizedData)
      .eq("id", id)

    if (error) {
      console.error(`❌ Supabase update error for job ${id}:`, error.message)
      return NextResponse.json(
        { success: false, error: "Database update failed." },
        { status: 500 }
      )
    }

    // console.log(`✅ Successfully updated job ${id}:`, sanitizedData)

    return NextResponse.json({ 
      success: true, 
      updated_fields: Object.keys(sanitizedData) 
    })

  } catch (err) {
    console.error("🔥 Job Update API error:", err)
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    )
  }
}