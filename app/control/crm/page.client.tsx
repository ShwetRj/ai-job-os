"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { UserPlus, Mail, Building2, X, Search, Briefcase } from "lucide-react"
import { Linkedin } from "@/components/icons/Linkedin"

export default function CRMPage() {
  const [recruiters, setRecruiters] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ name: '', company: '', role: '', email: '', linkedin: '' })

  useEffect(() => { fetchRecruiters() }, [])

  async function fetchRecruiters() {
    const { data, error } = await supabase.from("recruiter_crm").select("*").order("created_at", { ascending: false })
    if (error) console.error(error)
    setRecruiters(data || [])
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    const { data, error } = await supabase.from("recruiter_crm").insert([form]).select()
    if (!error && data) {
      setRecruiters([data[0], ...recruiters])
      setShowModal(false)
      setForm({ name: '', company: '', role: '', email: '', linkedin: '' })
    } else {
      alert("Error adding recruiter: " + error?.message)
    }
  }

  return (
    <div className="p-8 space-y-10">
      <div className="flex justify-between items-center bg-white/5 p-6 rounded-[2rem] border border-white/10">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Enterprise Network</h1>
          <p className="text-gray-400 text-sm">Direct contacts for IAM & BA roles</p>
        </div>
        <button 
          onClick={() => setShowModal(true)} 
          className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-2xl font-black flex items-center gap-2 transition-all shadow-xl shadow-blue-600/20"
        >
          <UserPlus size={20} /> ADD RECRUITER
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
        <input 
          className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl text-white outline-none focus:border-blue-500"
          placeholder="Filter by name or company..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* CONTACT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recruiters.filter(r => r.name?.toLowerCase().includes(searchTerm.toLowerCase())).map(r => (
          <div key={r.id} className="glass p-6 rounded-3xl border border-white/10 hover:border-blue-500/30 transition-all group">
            <h3 className="font-bold text-white text-xl">{r.name}</h3>
            <p className="text-blue-400 font-medium mb-4">{r.role} @ {r.company}</p>
            <div className="flex gap-2">
              {r.linkedin && <a href={r.linkedin} target="_blank" className="p-3 bg-white/5 rounded-xl text-blue-400 hover:bg-blue-600/20"><Linkedin size={20} /></a>}
              {r.email && <a href={`mailto:${r.email}`} className="p-3 bg-white/5 rounded-xl text-green-400 hover:bg-green-600/20"><Mail size={20} /></a>}
            </div>
          </div>
        ))}
      </div>

      {/* FORM MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-[100] p-4">
          <form onSubmit={handleAdd} className="glass bg-[#020617] p-10 rounded-[3rem] w-full max-w-md border border-white/10 space-y-6 shadow-2xl">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-black text-white">New Contact</h2>
              <button type="button" onClick={() => setShowModal(false)}><X className="text-gray-500 hover:text-white" /></button>
            </div>
            <div className="space-y-4">
              <input required className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white" placeholder="Full Name" onChange={e => setForm({...form, name: e.target.value})} />
              <input required className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white" placeholder="Company" onChange={e => setForm({...form, company: e.target.value})} />
              <input className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white" placeholder="Designation" onChange={e => setForm({...form, role: e.target.value})} />
              <input className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white" placeholder="Email" type="email" onChange={e => setForm({...form, email: e.target.value})} />
              <input className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white" placeholder="LinkedIn URL" onChange={e => setForm({...form, linkedin: e.target.value})} />
            </div>
            <button type="submit" className="w-full bg-blue-600 py-4 rounded-2xl font-black text-white hover:bg-blue-500 transition-all">SAVE TO CRM</button>
          </form>
        </div>
      )}
    </div>
  )
}