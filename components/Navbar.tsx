"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function Navbar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  async function logout() {
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  const navLinks = [
    { name: "Dashboard", href: "/control" },
    { name: "Jobs", href: "/control/jobs" },
    { name: "Applied", href: "/control/jobs?tab=applied" },
    { name: "Kanban", href: "/control/kanban" },
    { name: "CRM", href: "/control/crm" },
    { name: "Hire Me", href: "/hire-me" },
  ]

  const externalLinks = [
    { name: "n8n", href: "https://n8n.jobhuntingaiagent.me", color: "text-orange-400" },
    { name: "Retool", href: "https://aijobhuntingdashboard.retool.com", color: "text-blue-400" },
  ]

  return (
    <nav className="sticky top-0 z-[100] w-full bg-[#020617]/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-[1400px] mx-auto flex justify-between items-center px-6 py-4">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group transition-transform active:scale-95">
          <span className="text-2xl">🚀</span>
          <span className="font-black text-xl tracking-tighter bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            CAREER OS
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-8 text-sm font-medium items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors duration-200 hover:text-white ${
                pathname === link.href ? "text-white font-bold" : "text-gray-400"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Separator */}
          <div className="h-4 w-px bg-white/10" />

          {externalLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${link.color} opacity-80 hover:opacity-100 transition-opacity flex items-center gap-1`}
            >
              {link.name}
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          ))}

          <button
            onClick={logout}
            className="ml-4 px-4 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold hover:bg-red-500 hover:text-white transition-all duration-200"
          >
            Logout
          </button>
        </div>

        {/* MOBILE TOGGLE */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#020617] border-b border-white/10 p-6 flex flex-col gap-6 animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-lg ${pathname === link.href ? "text-blue-400" : "text-white"}`}
            >
              {link.name}
            </Link>
          ))}
          <div className="h-px bg-white/10 w-full" />
          <div className="flex gap-4">
            {externalLinks.map((link) => (
              <a key={link.href} href={link.href} target="_blank" className={link.color}>
                {link.name}
              </a>
            ))}
          </div>
          <button
            onClick={logout}
            className="w-full bg-red-500 py-3 rounded-xl font-bold"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  )
}