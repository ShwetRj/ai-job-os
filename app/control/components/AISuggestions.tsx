import Link from "next/link"

// ✅ Next-Level: Proper TypeScript interfaces
interface Job {
  id: string;
  title?: string;
  company: string;
  score: number;
  applied: boolean;
}

interface AISuggestionsProps {
  jobs: Job[];
}

export default function AISuggestions({ jobs = [] }: AISuggestionsProps) {
  // Filter out applied jobs, sort by highest score, take top 3
  const topMatches = jobs
    .filter((j) => !j.applied && typeof j.score === 'number')
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)

  return (
    <div className="mb-8 relative group animate-fade-in">
      {/* 🔥 AI Glowing Border Trick */}
      <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-2xl opacity-50 group-hover:opacity-100 blur-[2px] transition-opacity duration-500"></div>
      
      {/* Main Card Content */}
      <div className="relative bg-[#0f172a]/90 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
        
        {/* Header */}
        <div className="flex items-center gap-2 mb-5">
          <span className="text-2xl animate-pulse">✨</span>
          <h2 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            AI Top Recommendations
          </h2>
        </div>

        {/* Empty State */}
        {topMatches.length === 0 ? (
          <div className="text-sm text-gray-400 bg-white/5 p-4 rounded-xl border border-white/5 border-dashed text-center">
            You have applied to all your top matches. Time to source more jobs!
          </div>
        ) : (
          /* Suggestion List */
          <div className="space-y-3">
            {topMatches.map((j) => {
              // Dynamic score coloring
              const scoreColor = j.score >= 80 ? 'text-green-400 bg-green-500/10 border-green-500/20' 
                               : j.score >= 60 ? 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' 
                               : 'text-red-400 bg-red-500/10 border-red-500/20';

              return (
                <div 
                  key={j.id} 
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                >
                  <div className="flex flex-col pr-4">
                    <span className="text-sm font-semibold text-white truncate max-w-[200px] sm:max-w-[300px]">
                      {j.title || "Target Role"}
                    </span>
                    <span className="text-xs text-gray-400 mt-0.5">
                      {j.company}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`px-2 py-1 text-xs font-bold rounded-md border ${scoreColor}`}>
                      {j.score} Match
                    </span>
                    {/* Link to the jobs pipeline */}
                    <Link 
                      href="/control/jobs" 
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-blue-500 text-gray-400 hover:text-white transition-colors"
                      title="View in Pipeline"
                    >
                      →
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}