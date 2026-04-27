export function calculateSuccessScore(job: any) {
  let score = 0

  // 🔹 Base score from AI scoring engine
  score += job.score || 0

  // 🔹 Boost if not applied yet
  if (!job.applied) score += 10

  // 🔹 Boost if clicked (you showed interest)
  if (job.clicked_at) score += 5

  // 🔹 Penalize if already applied multiple times
  if (job.apply_count > 1) score -= 10

  // 🔹 Fresh job boost
  if (job.created_at) {
    const daysOld =
      (Date.now() - new Date(job.created_at).getTime()) /
      (1000 * 60 * 60 * 24)

    if (daysOld < 2) score += 10
    else if (daysOld > 7) score -= 5
  }

  // 🔹 Recruiter info boost (high chance)
  if (job.recruiter_email) score += 15

  // 🔹 Clamp score
  return Math.max(0, Math.min(100, Math.round(score)))
}
