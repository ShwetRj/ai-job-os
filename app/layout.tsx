"use client"

import "./globals.css"
import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function RootLayout({ children }: any) {
  const [user, setUser] = useState<any>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  async function logout() {
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  return (
    <html lang="en">
      <body className="bg-[#020617] text-gray-200 antialiased selection:bg-blue-500/30">

        {/* 🔥 SAAS NAVBAR */}
        <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#020617]/80 border-b border-white/10 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

            {/* LOGO */}
            <Link 
              href="/" 
              className="font-black text-xl tracking-wide flex items-center gap-2 group hover:opacity-80 transition-opacity"
            >
              <span>🚀</span>
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Career OS
              </span>
            </Link>

            {/* DESKTOP MENU */}
            <div className="hidden lg:flex gap-8 items-center text-sm font-medium">
              <Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>

              {user && (
                <>
                  <Link href="/control" className="text-gray-400 hover:text-white transition-colors">Dashboard</Link>
                  <Link href="/control/jobs" className="text-gray-400 hover:text-white transition-colors">Jobs</Link>
                  <Link href="/control/applied" className="text-gray-400 hover:text-white transition-colors">Applied</Link>
                  <Link href="/control/crm" className="text-gray-400 hover:text-white transition-colors">CRM</Link>
                  <Link href="/control/kanban" className="text-gray-400 hover:text-white transition-colors">Kanban</Link>
                  <Link href="/hire-me" className="text-gray-400 hover:text-white transition-colors">Hire Me</Link>
                </>
              )}

              <div className="h-4 w-px bg-white/20 mx-2"></div> {/* Divider */}

              {/* EXTERNAL */}
              <Link href="https://n8n.jobhuntingaiagent.me" target="_blank" className="text-purple-400/80 hover:text-purple-300 transition-colors">
                n8n
              </Link>
              <Link href="https://retool.jobhuntingaiagent.me" target="_blank" className="text-purple-400/80 hover:text-purple-300 transition-colors">
                Retool
              </Link>

              {/* AUTH */}
              <div className="flex items-center gap-3 ml-2">
                {!user ? (
                  <>
                    <Link href="/login" className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 border border-white/10 hover:bg-white/5 hover:text-white transition-all">
                      Login
                    </Link>
                    <Link href="/signup" className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all">
                      Signup
                    </Link>
                  </>
                ) : (
                  <button
                    onClick={logout}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>

            {/* MOBILE MENU BUTTON */}
            <button 
              className="lg:hidden p-2 text-gray-400 hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* MOBILE MENU PANEL */}
          {isMobileMenuOpen && (
            <div className="lg:hidden bg-[#020617] border-b border-white/10 absolute w-full left-0 top-full shadow-xl">
              <div className="flex flex-col px-6 py-4 space-y-4 text-sm font-medium">
                <Link onClick={() => setIsMobileMenuOpen(false)} href="/" className="text-gray-400 hover:text-white">Home</Link>
                
                {user && (
                  <>
                    <Link onClick={() => setIsMobileMenuOpen(false)} href="/control" className="text-gray-400 hover:text-white">Dashboard</Link>
                    <Link onClick={() => setIsMobileMenuOpen(false)} href="/control/jobs" className="text-gray-400 hover:text-white">Jobs</Link>
                    <Link onClick={() => setIsMobileMenuOpen(false)} href="/control/applied" className="text-gray-400 hover:text-white">Applied</Link>
                    <Link onClick={() => setIsMobileMenuOpen(false)} href="/control/crm" className="text-gray-400 hover:text-white">CRM</Link>
                    <Link onClick={() => setIsMobileMenuOpen(false)} href="/control/kanban" className="text-gray-400 hover:text-white">Kanban</Link>
                    <Link onClick={() => setIsMobileMenuOpen(false)} href="/hire-me" className="text-gray-400 hover:text-white">Hire Me</Link>
                  </>
                )}

                <div className="h-px w-full bg-white/10 my-2"></div>

                <Link onClick={() => setIsMobileMenuOpen(false)} href="https://n8n.jobhuntingaiagent.me" target="_blank" className="text-purple-400">n8n</Link>
                <Link onClick={() => setIsMobileMenuOpen(false)} href="https://retool.jobhuntingaiagent.me" target="_blank" className="text-purple-400">Retool</Link>

                <div className="flex flex-col gap-3 pt-4 border-t border-white/10 mt-2">
                  {!user ? (
                    <>
                      <Link onClick={() => setIsMobileMenuOpen(false)} href="/login" className="w-full text-center px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5">Login</Link>
                      <Link onClick={() => setIsMobileMenuOpen(false)} href="/signup" className="w-full text-center px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500">Signup</Link>
                    </>
                  ) : (
                    <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="w-full text-center px-4 py-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
                      Logout
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* 🔥 MAIN LAYOUT WRAPPER */}
        <div className="min-h-screen flex flex-col">
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12 space-y-10 animate-fade-in">
            {children}
          </main>
        </div>

      </body>
    </html>
  )
}