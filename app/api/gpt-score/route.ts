import { NextResponse } from "next/server"

// ✅ Type safety for the incoming job payload
interface JobData {
  title?: string;
  company?: string;
  score?: number;
  [key: string]: any;
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const job: JobData = body.job

    if (!job || typeof job.score !== 'number') {
      return NextResponse.json(
        { reason: "⚠️ Invalid job data provided." },
        { status: 400 }
      )
    }

    const score = job.score

    // 🔥 Next-Level Dynamic Context
    let level = "Low"
    let icon = "🔴"
    let actionItem = "You will need to heavily tailor your resume or leverage a referral to land this interview."
    
    if (score >= 80) {
      level = "High"
      icon = "🟢"
      actionItem = "Excellent fit. Apply immediately and reach out directly to the hiring manager."
    } else if (score >= 60) {
      level = "Medium"
      icon = "🟡"
      actionItem = "Solid potential. Be sure to highlight your transferable skills in your outreach."
    }

    // 💡 PRODUCTION NOTE: 
    // This is exactly where you will eventually put your OpenAI/Gemini fetch request.
    // Example: const chatCompletion = await openai.chat.completions.create({...})

    // 🔥 Upgraded Formatted Response (Using Markdown-style structure for UI rendering)
    const reason = `### ${icon} ${level} Match (${score}/100)

**Role:** ${job.title || "Unknown Role"} at ${job.company || "Unknown Company"}

**✨ AI Reasoning:**
Based on your master profile, there is a ${level.toLowerCase()} alignment with the core requirements of this role. 

**📈 Key Insights:**
• Matches standard industry required skills.
• Domain experience aligns with company sector.
• **Next Step:** ${actionItem}`

    // 🕒 Simulate AI thinking time (800ms) so you can test your UI's loading states!
    await new Promise((resolve) => setTimeout(resolve, 800))

    return NextResponse.json({ reason })

  } catch (err) {
    console.error("🔥 AI Score Error:", err)
    return NextResponse.json(
      { reason: "⚠️ The AI engine is currently resting. Please try again later." },
      { status: 500 }
    )
  }
}