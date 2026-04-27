"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      // Use getSession for a quick local check, then verify if needed
      const { data, error } = await supabase.auth.getSession()

      if (error || !data.session) {
        router.replace("/login")
      } else {
        setLoading(false)
      }
    }

    checkUser()
  }, [router])

  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#020617] z-[9999]">
        {/* 🔥 Next-Level: Branded Loading State */}
        <div className="relative flex items-center justify-center">
          {/* Outer Pulsing Glow */}
          <div className="absolute w-24 h-24 bg-blue-500/20 rounded-full blur-2xl animate-pulse"></div>
          
          {/* Spinner */}
          <div className="w-12 h-12 border-4 border-white/5 border-t-blue-500 rounded-full animate-spin"></div>
          
          {/* Center Icon */}
          <div className="absolute text-xl">🚀</div>
        </div>
        
        <div className="mt-6 flex flex-col items-center gap-2">
          <p className="text-sm font-bold tracking-widest uppercase text-gray-500 animate-pulse">
            Authenticating
          </p>
          <div className="flex gap-1">
            <span className="w-1 h-1 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-1 h-1 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-1 h-1 bg-blue-500 rounded-full animate-bounce"></span>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}