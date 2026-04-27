"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function UpdatePassword() {
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  async function update(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    const { error } = await supabase.auth.updateUser({
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setMessage("Password updated successfully! Redirecting...")
      setTimeout(() => {
        window.location.href = "/login"
      }, 2000)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 animate-fade-in">
      
      {/* Header Context */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 mb-4 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
          <span className="text-3xl">🔐</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight mb-2">Security Update</h1>
        <p className="text-gray-400">Choose a strong new password for your account</p>
      </div>

      <div className="w-full max-w-md glass bg-[#0f172a]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
        
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-indigo-500/10 blur-[50px] pointer-events-none"></div>

        {/* Status Alerts */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-2 animate-fade-in">
            <span className="shrink-0 mt-0.5">⚠️</span>
            <span>{error}</span>
          </div>
        )}
        
        {message && (
          <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm flex items-start gap-2 animate-fade-in">
            <span className="shrink-0 mt-0.5">✅</span>
            <span>{message}</span>
          </div>
        )}

        <form onSubmit={update} className="space-y-6 relative z-10">
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">New Password</label>
            <input
              type="password"
              required
              minLength={6}
              placeholder="••••••••"
              className="w-full p-3.5 bg-black/40 border border-white/10 text-white rounded-xl focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder-gray-600"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <p className="text-[10px] text-gray-500 ml-1">
              Minimum 6 characters. Use a mix of symbols and letters for better security.
            </p>
          </div>

          <button 
            type="submit" 
            disabled={loading || password.length < 6}
            className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white rounded-xl font-bold shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Confirm New Password"
            )}
          </button>
        </form>
      </div>

      <button 
        onClick={() => window.location.href = "/login"}
        className="mt-8 text-gray-500 text-sm hover:text-gray-300 transition-colors"
      >
        Back to Login
      </button>

    </div>
  )
}