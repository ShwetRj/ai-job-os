"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import WhyScore from "@/components/WhyScore"
import {
  DragDropContext,
  Droppable,
  Draggable
} from "@hello-pangea/dnd"

const columns = ["New", "Applied", "Interview", "Offer", "Rejected"]

export default function Jobs() {
  const [jobs, setJobs] = useState<any[]>([])
  const [recruiters, setRecruiters] = useState<any[]>([])

  useEffect(() => {
    fetchJobs()
    fetchRecruiters()
  }, [])

  async function fetchJobs() {
    const { data } = await supabase.from("jobs").select("*")
    setJobs(data || [])
  }

  async function fetchRecruiters() {
    const { data } = await supabase.from("recruiter_crm").select("*")
    setRecruiters(data || [])
  }

  async function updateStatus(id: string, status: string) {
    await supabase.from("jobs").update({ status }).eq("id", id)
  }

  async function assignRecruiter(jobId: string, recruiterId: string) {
    await supabase
      .from("jobs")
      .update({ recruiter_id: recruiterId })
      .eq("id", jobId)

    fetchJobs()
  }

  async function apply(job: any) {
    // 🔥 instant UI update
    setJobs((prev) =>
      prev.map((j) =>
        j.id === job.id
          ? { ...j, applied: true, status: "Applied" }
          : j
      )
    )

    await supabase
      .from("jobs")
      .update({
        applied: true,
        status: "Applied",
        applied_at: new Date().toISOString(),
        follow_up_date: new Date(
          Date.now() + 3 * 24 * 60 * 60 * 1000
        )
      })
      .eq("id", job.id)
  }

  async function onDragEnd(result: any) {
    if (!result.destination) return

    const jobId = result.draggableId
    const newStatus = result.destination.droppableId

    // 🔥 instant UI update
    setJobs((prev) =>
      prev.map((j) =>
        j.id === jobId ? { ...j, status: newStatus } : j
      )
    )

    await updateStatus(jobId, newStatus)
  }

  return (
    <div className="space-y-10">

      <h1 className="text-4xl font-bold">🗂 Job Pipeline</h1>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid md:grid-cols-5 gap-6">

          {columns.map((col) => (
            <Droppable droppableId={col} key={col}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-white/5 p-4 rounded-xl min-h-[400px]"
                >
                  <h2 className="mb-4 font-semibold">{col}</h2>

                  {jobs
                    .filter(Boolean)
                    .filter(
                      (j) =>
                        j.status === col ||
                        (!j.status && col === "New")
                    )
                    .map((job, index) => {

                      const recruiter = recruiters.find(
                        (r) => r.id === job.recruiter_id
                      )

                      const isFollowUpDue =
                        job.follow_up_date &&
                        new Date(job.follow_up_date) <= new Date()

                      return (
                        <Draggable
                          key={job.id}
                          draggableId={String(job.id)}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="bg-black/40 p-4 mb-3 rounded-lg space-y-3"
                            >

                              {/* 🔥 DRAG HANDLE ONLY */}
                              <div
                                {...provided.dragHandleProps}
                                className="cursor-grab text-xs text-gray-500"
                              >
                                ⠿ Drag
                              </div>

                              {/* JOB INFO */}
                              <div>
                                <p className="font-semibold">
                                  {job.company}
                                </p>
                                <p className="text-sm text-gray-400">
                                  {job.title}
                                </p>
                              </div>

                              {/* SCORE */}
                              <p className="text-xs text-blue-400">
                                Score: {job.score || 0}
                              </p>

                              {/* APPLY BUTTON */}
                              {!job.applied && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    apply(job)
                                  }}
                                  className="w-full bg-blue-500 py-1 rounded text-xs hover:bg-blue-600"
                                >
                                  🚀 Apply
                                </button>
                              )}

                              {/* RECRUITER */}
                              <select
                                value={job.recruiter_id || ""}
                                onChange={(e) => {
                                  e.stopPropagation()
                                  assignRecruiter(job.id, e.target.value)
                                }}
                                className="w-full bg-black/50 text-xs p-1 rounded"
                              >
                                <option value="">Assign Recruiter</option>
                                {recruiters.map((r) => (
                                  <option key={r.id} value={r.id}>
                                    {r.name} ({r.company})
                                  </option>
                                ))}
                              </select>

                              {/* SHOW RECRUITER */}
                              {recruiter && (
                                <div className="text-xs text-gray-400">
                                  👤 {recruiter.name}
                                </div>
                              )}

                              {/* FOLLOW-UP ALERT */}
                              {isFollowUpDue && (
                                <div className="text-xs bg-red-500/20 p-2 rounded">
                                  ⚠ Follow-up due
                                </div>
                              )}

                              {/* AI */}
                              <WhyScore job={job} />

                            </div>
                          )}
                        </Draggable>
                      )
                    })}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}

        </div>
      </DragDropContext>

    </div>
  )
}