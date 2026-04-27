import { NextResponse } from "next/server"
import OpenAI from "openai"
import { createClient } from "@supabase/supabase-js"
import { USER_PROFILE } from "@/lib/profile"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST() {
  try {
    const { data: jobs } = await supabase
      .from("jobs")
      .select("*")
      .is("success_score", null)
      .limit(5)

    for (const job of jobs || []) {
      const prompt = `
Evaluate this job for the candidate.

Candidate Profile:
${USER_PROFILE}

Job:
Title: ${job.title}
Company: ${job.company}
Description: ${job.description}

Return JSON:
{
  "score": number (0-100),
  "reason": "short reason",
  "strengths": ["..."],
  "gaps": ["..."]
}
`

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      })

      const text = response.choices[0].message.content

      let parsed: any = {}
      try {
        parsed = JSON.parse(text || "{}")
      } catch {
        console.log("Parse failed:", text)
        continue
      }

      await supabase
        .from("jobs")
        .update({
          success_score: parsed.score,
          ai_reason: parsed.reason,
          ai_strengths: parsed.strengths,
          ai_gaps: parsed.gaps,
        })
        .eq("id", job.id)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ success: false })
  }
}
