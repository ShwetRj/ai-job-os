"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import WhyScore from "@/components/WhyScore"
import { ExternalLink, CheckCircle2, UserCircle2, Star, Trophy } from "lucide-react"

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([])
  const [recruiters, setRecruiters] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"sourced" | "applied">("sourced")

  useEffect(() => {
    fetchInitialData()
  }, [])

  async function fetchInitialData() {
    setLoading(true)
    // Fetching jobs ordered by your custom score
    const [jobsRes, crmRes] = await Promise.all([
      supabase.from("jobs").select("*").order("score", { ascending: false }),
      supabase.from("recruiter_crm").select("id, name, company")
    ])
    setJobs(jobsRes.data || [])
    setRecruiters(crmRes.data || [])
    setLoading(false)
  }

  // 🔥 CORE LOGIC: Apply, Redirect, and Move
async function handleApply(job: any) {
  // 1. Open URL
  window.open(job.url, "_blank", "noopener,noreferrer");

  // 2. Persist to DB
  const { data, error } = await supabase
    .from("jobs")
    .update({ 
      applied: true, 
      status: 'Applied', 
      applied_at: new Date().toISOString() 
    })
    .eq("id", job.id)
    .select(); // Confirm the update happened

  if (error) {
    console.error("Persistence Error:", error.message);
    alert("Database rejected the change. Check RLS Policies.");
    return;
  }

  // 3. Update UI only after DB confirms success
  setJobs(prev => prev.map(j => 
    j.id === job.id ? { ...j, applied: true, status: 'Applied' } : j
  ));
}

  async function linkRecruiter(jobId: string, recruiterId: string) {
    const { error } = await supabase
      .from("jobs")
      .update({ recruiter_id: recruiterId })
      .eq("id", jobId)

    if (!error) {
      setJobs(prev => prev.map(j => j.id === jobId ? { ...j, recruiter_id: recruiterId } : j))
    }
  }

  if (loading) return <div className="text-center mt-20 animate-pulse text-gray-500 font-bold tracking-widest uppercase text-xs">Syncing Your Career OS...</div>

  const filteredJobs = jobs.filter(j => activeTab === "applied" ? j.applied : !j.applied)

  return (
    <div className="space-y-10 pb-20">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter">Hiring Pipeline</h1>
          <p className="text-gray-400 text-sm mt-1">AI-scored opportunities for your BA expertise</p>
        </div>
        
        {/* TAB TOGGLE */}
        <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10 shadow-2xl">
          <button 
            onClick={() => setActiveTab("sourced")}
            className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'sourced' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
          >
            Sourced ({jobs.filter(j => !j.applied).length})
          </button>
          <button 
            onClick={() => setActiveTab("applied")}
            className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'applied' ? 'bg-green-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
          >
            Applied ({jobs.filter(j => j.applied).length})
          </button>
        </div>
      </div>

      {/* JOB LIST */}
      <div className="grid gap-6">
        {filteredJobs.length === 0 ? (
          <div className="p-20 text-center glass rounded-[2.5rem] border border-dashed border-white/10 text-gray-500 italic">
            No opportunities currently in this stage.
          </div>
        ) : (
          filteredJobs.map(job => (
            <div key={job.id} className="group relative glass p-8 rounded-[2rem] border border-white/10 hover:border-blue-500/30 transition-all duration-500">
              <div className="flex flex-col lg:flex-row justify-between gap-8">
                
                {/* LEFT: INFO & SCORE */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-start gap-4">
                    {/* SCORE BADGE */}
                    <div className={`shrink-0 w-16 h-16 rounded-2xl flex flex-col items-center justify-center border ${job.score >= 80 ? 'bg-blue-500/20 border-blue-500/40' : 'bg-white/5 border-white/10'}`}>
                       <span className={`text-xl font-black ${job.score >= 80 ? 'text-blue-400' : 'text-gray-400'}`}>{job.score || 0}</span>
                       <span className="text-[8px] uppercase font-bold text-gray-500 tracking-tighter">Match</span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="font-bold text-2xl text-white group-hover:text-blue-400 transition-colors tracking-tight">{job.title}</h3>
                        {job.score >= 90 && (
                          <span className="flex items-center gap-1 px-2 py-0.5 bg-yellow-500/20 text-yellow-500 text-[10px] font-black rounded-md uppercase border border-yellow-500/20">
                            <Trophy size={10} /> Prime Target
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 font-semibold text-lg">
                        <span className="text-blue-400/80">{job.company}</span> <span className="text-gray-600 mx-2">|</span> {job.location}
                      </p>
                    </div>
                  </div>
                  
                  <WhyScore job={job} />
                </div>

                {/* RIGHT: ACTIONS & RECRUITER */}
                <div className="flex flex-col md:flex-row lg:flex-col items-center lg:items-end justify-between gap-6 shrink-0">
                  
                  {/* RECRUITER SELECTOR */}
                  <div className="space-y-1.5 w-full md:w-auto">
                    <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1 flex items-center gap-2">
                      <UserCircle2 size={12} /> Linked Recruiter
                    </label>
                    <select 
                      value={job.recruiter_id || ""} 
                      onChange={(e) => linkRecruiter(job.id, e.target.value)}
                      className="bg-black/40 border border-white/10 text-xs p-3 rounded-xl text-gray-300 outline-none w-full md:w-56 hover:bg-white/5 transition-colors focus:border-blue-500/50"
                    >
                      <option value="">Choose Contact...</option>
                      {recruiters.map(r => (
                        <option key={r.id} value={r.id} className="bg-[#0f172a]">{r.name} ({r.company})</option>
                      ))}
                    </select>
                  </div>

                  <button 
                    onClick={() => handleApply(job)}
                    disabled={job.applied}
                    className={`group/btn flex items-center justify-center gap-3 w-full md:w-auto px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all active:scale-95 ${
                      job.applied 
                      ? 'bg-green-500/10 text-green-400 border border-green-500/20 cursor-default' 
                      : 'bg-blue-600 hover:bg-blue-500 text-white shadow-2xl shadow-blue-600/30'
                    }`}
                  >
                    {job.applied ? (
                      <><CheckCircle2 size={20} /> Application Sent</>
                    ) : (
                      <><ExternalLink size={20} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" /> Apply Now</>
                    )}
                  </button>
                </div>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}