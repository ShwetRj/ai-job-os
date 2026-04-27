"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import Link from "next/link"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  // 🔥 Next-Level: UX State Management
  const [loading, setLoading] = useState(false)
  const [authLoading, setAuthLoading] = useState<"google" | "github" | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  async function login(e: React.FormEvent) {
    e.preventDefault() // Prevents page reload on 'Enter' key
    setLoading(true)
    setError(null)
    setMessage(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      window.location.href = "/control"
    }
  }

  async function googleLogin() {
    setAuthLoading("google")
    setError(null)
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://jobhuntingaiagent.me/control",
      },
    })
  }

  async function githubLogin() {
    setAuthLoading("github")
    setError(null)
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "https://jobhuntingaiagent.me/control",
      },
    })
  }

  async function forgotPassword() {
    setError(null)
    setMessage(null)

    if (!email) {
      setError("Please enter your email address first.")
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://jobhuntingaiagent.me/update-password",
    })

    if (error) {
      setError(error.message)
    } else {
      setMessage("Check your inbox! We've sent a password reset link.")
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 animate-fade-in">
      
      {/* Header text outside the box for depth */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 mb-4 shadow-[0_0_30px_rgba(37,99,235,0.2)]">
          <span className="text-3xl">🚀</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight mb-2">Welcome Back</h1>
        <p className="text-gray-400">Log in to your Career OS dashboard</p>
      </div>

      <div className="w-full max-w-md glass bg-[#0f172a]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
        
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-blue-500/10 blur-[50px] pointer-events-none"></div>

        {/* Inline Alerts */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-2">
            <span className="shrink-0 mt-0.5">⚠️</span>
            <span>{error}</span>
          </div>
        )}
        
        {message && (
          <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm flex items-start gap-2">
            <span className="shrink-0 mt-0.5">✅</span>
            <span>{message}</span>
          </div>
        )}

        <form onSubmit={login} className="space-y-5 relative z-10">
          
          {/* EMAIL */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300 ml-1">Email</label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="w-full p-3.5 bg-black/40 border border-white/10 text-white rounded-xl focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder-gray-600"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          {/* PASSWORD */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm font-medium text-gray-300">Password</label>
              <button
                type="button"
                onClick={forgotPassword}
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
              >
                Forgot?
              </button>
            </div>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full p-3.5 bg-black/40 border border-white/10 text-white rounded-xl focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder-gray-600"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          {/* LOGIN BUTTON */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-bold shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 mt-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="my-6 flex items-center gap-4 relative z-10">
          <div className="h-px bg-white/10 flex-1"></div>
          <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Or continue with</span>
          <div className="h-px bg-white/10 flex-1"></div>
        </div>

        {/* OAUTH BUTTONS */}
        <div className="space-y-3 relative z-10">
          <button
            type="button"
            onClick={googleLogin}
            disabled={authLoading !== null}
            className="w-full py-3 bg-white hover:bg-gray-100 text-gray-900 rounded-xl font-bold transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {authLoading === "google" ? (
              <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            )}
            Google
          </button>

          <button
            type="button"
            onClick={githubLogin}
            disabled={authLoading !== null}
            className="w-full py-3 bg-[#24292F] hover:bg-[#2c3137] border border-white/10 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {authLoading === "github" ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            )}
            GitHub
          </button>
        </div>
      </div>

      <p className="mt-8 text-gray-500 text-sm text-center">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
          Sign up for free
        </Link>
      </p>

    </div>
  )
}