"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function login() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert(error.message)
    } else {
      window.location.href = "/control"
    }
  }

  async function googleLogin() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://jobhuntingaiagent.me/control",
      },
    })
  }

  async function githubLogin() {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "https://jobhuntingaiagent.me/control",
      },
    })
  }

  async function forgotPassword() {
    if (!email) {
      alert("Enter email first")
      return
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://jobhuntingaiagent.me/update-password",
    })

    if (error) {
      alert(error.message)
    } else {
      alert("Password reset email sent")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-xl p-8 space-y-5">

        <h1 className="text-2xl font-semibold text-center">Login</h1>

        {/* EMAIL */}
        <input
          placeholder="Email"
          className="w-full p-3 bg-black/30 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 bg-black/30 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* LOGIN */}
        <button onClick={login} className="bg-blue-500 w-full py-3 rounded">
          Login
        </button>

        {/* FORGOT PASSWORD */}
        <button
          onClick={forgotPassword}
          className="text-sm text-blue-400 text-left"
        >
          Forgot Password?
        </button>

        <div className="text-center text-gray-400 text-sm">or</div>

        {/* GOOGLE */}
        <button
          onClick={googleLogin}
          className="bg-red-500 w-full py-2 rounded"
        >
          Continue with Google
        </button>

        {/* GITHUB */}
        <button
          onClick={githubLogin}
          className="bg-gray-700 w-full py-2 rounded"
        >
          Continue with GitHub
        </button>

      </div>
    </div>
  )
}
