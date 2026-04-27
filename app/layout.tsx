"use client"

import "./globals.css"
import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function RootLayout({ children }: any) {
  const [user, setUser] = useState<any>(null)

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
      <body className="bg-[#020617] text-white antialiased">

        {/* 🔥 SAAS NAVBAR */}
        <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/5 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

            {/* LOGO */}
            <Link href="/" className="font-bold text-xl tracking-wide">
              🚀 Career OS
            </Link>

            {/* MENU */}
            <div className="flex gap-6 items-center text-sm">

              <Link href="/" className="hover:text-blue-400">Home</Link>

              {user && (
                <>
                  <Link href="/control" className="hover:text-blue-400">Dashboard</Link>
                  <Link href="/control/jobs" className="hover:text-blue-400">Jobs</Link>
                  <Link href="/control/applied" className="hover:text-blue-400">Applied</Link>
                  <Link href="/control/crm" className="hover:text-blue-400">CRM</Link>
                  <Link href="/hire-me" className="hover:text-blue-400">Hire Me</Link>
                </>
              )}

              {/* EXTERNAL */}
              <Link href="https://n8n.jobhuntingaiagent.me" target="_blank" className="hover:text-purple-400">
                n8n
              </Link>
              <Link href="https://retool.jobhuntingaiagent.me" target="_blank" className="hover:text-purple-400">
                Retool
              </Link>

              {/* AUTH */}
              {!user ? (
                <>
                  <Link href="/login" className="border border-white/20 px-3 py-1 rounded hover:bg-white/10">
                    Login
                  </Link>
                  <Link href="/signup" className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-500">
                    Signup
                  </Link>
                </>
              ) : (
                <button
                  onClick={logout}
                  className="bg-red-500 px-3 py-1 rounded hover:bg-red-400"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </nav>

        {/* 🔥 MAIN LAYOUT WRAPPER */}
        <div className="min-h-screen">

          {/* 🔥 PROPER CENTERED + SPACED CONTAINER */}
          <main className="max-w-7xl mx-auto px-6 py-12 space-y-10">
            {children}
          </main>

        </div>

      </body>
    </html>
  )
}