/**
 * 🧠 CAREER OS INTELLIGENCE ENGINE
 * This function calculates a "Probability of Success" score (0-100)
 * based on behavioral data and job freshness.
 */

interface JobData {
  score?: number;
  applied?: boolean;
  clicked_at?: string | Date;
  apply_count?: number;
  created_at?: string | Date;
  recruiter_email?: string;
  [key: string]: any;
}

// 🔥 1. Define a strict type for the weights
type ScoringWeights = {
  BASE_AI_SCORE: number;
  UNAPPLIED_BOOST: number;
  INTEREST_BOOST: number;
  FRESHNESS_BOOST: number;
  STALE_PENALTY: number;
  RE_APPLY_PENALTY: number;
  DIRECT_CONTACT_BOOST: number;
};

// 🔥 2. Apply the type to the object
const WEIGHTS: ScoringWeights = {
  BASE_AI_SCORE: 1.0,
  UNAPPLIED_BOOST: 10,
  INTEREST_BOOST: 5,
  FRESHNESS_BOOST: 10,
  STALE_PENALTY: -5,
  RE_APPLY_PENALTY: -15,
  DIRECT_CONTACT_BOOST: 15
};

export function calculateSuccessScore(job: JobData): number {
  let score = 0;

  // 1. 🔹 Base Alignment (from the AI scoring engine)
  score += (job.score || 0) * WEIGHTS.BASE_AI_SCORE;

  // 2. 🔹 Behavioral Signals
  if (!job.applied) {
    score += WEIGHTS.UNAPPLIED_BOOST;
  }

  if (job.clicked_at) {
    score += WEIGHTS.INTEREST_BOOST;
  }

  // 3. 🔹 Efficiency Tracking
  if ((job.apply_count || 0) > 1) {
    score += WEIGHTS.RE_APPLY_PENALTY;
  }

  // 4. 🔹 Recency & Freshness
  if (job.created_at) {
    const createdAt = new Date(job.created_at).getTime();
    const daysOld = (Date.now() - createdAt) / (1000 * 60 * 60 * 24);

    if (daysOld < 2) {
      score += WEIGHTS.FRESHNESS_BOOST;
    } else if (daysOld > 7) {
      score += WEIGHTS.STALE_PENALTY;
    }
  }

  // 5. 🔹 Network Advantage
  // If we have a direct line to a recruiter, success probability jumps
  if (job.recruiter_email || job.recruiter_id) {
    score += WEIGHTS.DIRECT_CONTACT_BOOST;
  }

  // 6. 🔹 Global Normalization (Clamp 0 - 100)
  const finalScore = Math.round(score);
  return Math.max(0, Math.min(100, finalScore));
}

/**
 * PRO TIP: As a BA, you could extend this by adding a "Market Demand" 
 * multiplier or "Company Tier" weights based on your target list.
 */