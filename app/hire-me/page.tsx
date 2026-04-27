"use client"

import { Mail, ExternalLink, ShieldCheck, Database, Layout, Users, MapPin, CheckCircle2, Calendar } from "lucide-react"
import { Linkedin } from "@/components/icons/Linkedin" // 👈 Add this

export default function HireMe() {
  return (
    <div className="max-w-4xl mx-auto space-y-16 pb-24 animate-fade-in px-4">
      
      {/* 🚀 HERO SECTION */}
      <section className="text-center mt-12 space-y-6">
        <div className="relative inline-block">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur opacity-70 animate-pulse"></div>
          <img 
            src="https://media.licdn.com/dms/image/v2/D5603AQEv8u-V6e6lYQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1718222046487?e=1743638400&v=beta&t=7H_N4v0S0i5vS9YfE9uV4zQzR3zG2I6zV1fG2zV2I6z" 
            alt="Shwet Kumar" 
            className="relative w-36 h-36 rounded-full border-4 border-[#020617] object-cover mx-auto" 
          />
        </div>
        <div>
          <h1 className="text-5xl font-black text-white tracking-tighter">Shwet Kumar</h1>
          <p className="text-xl text-blue-400 font-bold mt-2 uppercase tracking-widest">Senior Technical Business Analyst</p>
          <div className="flex justify-center gap-4 mt-8">
            <a href="https://www.linkedin.com/in/shwet-kumar-b8b4a1121/" target="_blank" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-all bg-white/5 px-5 py-2.5 rounded-xl border border-white/10">
              <Linkedin size={18} /> LinkedIn
            </a>
            <a href="mailto:shwetraj67@gmail.com" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-all bg-white/5 px-5 py-2.5 rounded-xl border border-white/10">
              <Mail size={18} /> Email
            </a>
          </div>
        </div>
      </section>

      {/* 🔐 PROFILE SUMMARY */}
      <section className="glass bg-white/5 border border-white/10 p-10 rounded-[2.5rem] space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <ShieldCheck size={120} className="text-blue-500" />
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-[10px] font-black uppercase tracking-widest">Executive Summary</div>
        <p className="text-gray-300 text-xl leading-relaxed relative z-10">
          Senior Technical Business Analyst with <strong>4.5+ years of experience</strong> delivering enterprise-scale solutions across <strong>Identity & Access Management (IAM / PIAM)</strong>. 
        </p>
        <p className="text-gray-400 leading-relaxed max-w-3xl">
          I specialize in translating complex business requirements into clear, scalable solutions through strong requirements engineering (BRD, FRD, FDD), SQL-based data analysis, and BI dashboards for global clients like <strong>Adobe, Fidelity, and PG&E</strong>.
        </p>
      </section>

      {/* 🏆 EXPERIENCE GRID */}
      <div className="grid md:grid-cols-2 gap-6">
        {[
          { title: "IAM & Access Automation", icon: <ShieldCheck className="text-blue-400" />, text: "Leading end-to-end delivery for global clients across access provisioning and lifecycle automation." },
          { title: "Requirements Engineering", icon: <Layout className="text-purple-400" />, text: "Expertise in BRD, FRD, FDD, and complex SQL-driven data mapping for enterprise environments." },
          { title: "BI & Data Leadership", icon: <Database className="text-green-400" />, text: "Building Power BI & Tableau dashboards for SLA compliance and operational risk tracking." },
          { title: "Technical Lead & Mentor", icon: <Users className="text-orange-400" />, text: "Mentoring junior BAs and interns while ensuring documentation quality in Agile environments." }
        ].map((item, i) => (
          <div key={i} className="glass p-8 rounded-[2rem] border border-white/5 hover:border-blue-500/30 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6">{item.icon}</div>
            <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>

      {/* 🚨 OPEN TO WORK CALLOUT */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900/40 via-blue-900/40 to-black border border-blue-500/30 p-10 rounded-[2.5rem]">
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-2 text-green-400 font-black uppercase tracking-tighter text-sm">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-ping"></span>
            Open to Next Opportunity
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight">Driving IAM Delivery Across BA → PM Roles</h2>
          <div className="flex flex-wrap gap-4 text-gray-300 text-sm">
             <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10"><MapPin size={16} className="text-blue-400" /> India | Singapore | Remote</div>
             <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10"><Calendar size={16} className="text-blue-400" /> &lt; 30 Days Notice</div>
          </div>
          <div className="pt-4">
             <a href="mailto:shwetraj67@gmail.com" className="bg-white text-black px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-200 transition-colors inline-block">Contact Shwet</a>
          </div>
        </div>
      </section>
    </div>
  )
}