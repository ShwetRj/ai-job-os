"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { Building2, MapPin, Sparkles } from "lucide-react"

const COLUMNS = ["New", "Applied", "Interviewing", "Offer", "Rejected"]

export default function KanbanPage() {
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchJobs() }, [])

  async function fetchJobs() {
    const { data } = await supabase.from("jobs").select("*")
    setJobs(data || [])
    setLoading(false)
  }

  const onDragEnd = async (result: any) => {
    const { destination, source, draggableId } = result
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) return

    const newStatus = destination.droppableId
    const isApplied = newStatus === "Applied"

    // Optimistic Update
    const updatedJobs = Array.from(jobs)
    const jobIndex = updatedJobs.findIndex(j => j.id === draggableId)
    const [movedJob] = updatedJobs.splice(jobIndex, 1)
    movedJob.status = newStatus
    if (isApplied) movedJob.applied = true
    updatedJobs.splice(destination.index, 0, movedJob)
    setJobs(updatedJobs)

    // DB Update
    await supabase.from("jobs").update({ 
      status: newStatus, 
      applied: isApplied || movedJob.applied,
      applied_at: isApplied ? new Date().toISOString() : movedJob.applied_at 
    }).eq("id", draggableId)
  }

  if (loading) return <div className="p-10 text-gray-500 animate-pulse text-center">Loading Board...</div>

  return (
    <div className="h-[calc(100vh-180px)]">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white">Pipeline Board</h1>
        <p className="text-gray-400 text-sm">Visual tracking for active opportunities</p>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-6 h-full overflow-x-auto pb-4">
          {COLUMNS.map((col) => (
            <div key={col} className="flex-shrink-0 w-80 flex flex-col">
              <div className="flex items-center justify-between mb-4 px-2">
                <h2 className="text-sm font-black uppercase tracking-widest text-gray-500">{col}</h2>
                <span className="bg-white/5 text-gray-400 px-2 py-0.5 rounded-md text-[10px] font-bold">
                  {jobs.filter(j => j.status === col).length}
                </span>
              </div>

              <Droppable droppableId={col}>
                {(provided) => (
                  <div 
                    {...provided.droppableProps} 
                    ref={provided.innerRef} 
                    className="flex-1 bg-white/[0.02] border border-white/5 rounded-[2rem] p-4 min-h-[150px] space-y-4"
                  >
                    {jobs
                      .filter(j => j.status === col)
                      .map((job, index) => (
                        <Draggable key={job.id} draggableId={job.id} index={index}>
                          {(provided) => (
                            <div 
                              ref={provided.innerRef} 
                              {...provided.draggableProps} 
                              {...provided.dragHandleProps}
                              className="glass p-5 rounded-2xl border border-white/10 shadow-xl hover:border-blue-500/30 transition-all group active:scale-95"
                            >
                              <div className="space-y-3">
                                <div className="flex justify-between items-start gap-2">
                                  <h4 className="font-bold text-white text-sm leading-tight group-hover:text-blue-400 transition-colors">{job.title}</h4>
                                  {job.score > 80 && <Sparkles size={14} className="text-yellow-400 shrink-0" />}
                                </div>
                                <div className="space-y-1">
                                  <p className="text-xs text-gray-400 flex items-center gap-1.5"><Building2 size={12} /> {job.company}</p>
                                  <p className="text-[10px] text-gray-500 flex items-center gap-1.5"><MapPin size={12} /> {job.location}</p>
                                </div>
                                <div className="pt-2 flex items-center justify-between">
                                   <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden mr-3">
                                      <div className="h-full bg-blue-500" style={{ width: `${job.score}%` }}></div>
                                   </div>
                                   <span className="text-[10px] font-black text-blue-400">{job.score}%</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}