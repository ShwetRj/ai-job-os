import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { job } = await req.json()

    const score = job.score || 0

    let level = "Low"
    if (score > 80) level = "High"
    else if (score > 60) level = "Medium"

    const reason = `
Match Level: ${level}

Reasoning:
- Role: ${job.title}
- Company: ${job.company}
- Score: ${score}

Insights:
- Good alignment with required skills
- Relevant domain experience
- Potential fit based on past roles
`

    return NextResponse.json({ reason })
  } catch (err) {
    return NextResponse.json({
      reason: "Unable to generate explanation"
    })
  }
}