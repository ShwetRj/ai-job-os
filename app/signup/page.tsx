"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function signup() {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) alert(error.message)
    else {
      alert("Account created! Please login.")
      window.location.href = "/login"
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-xl p-8 space-y-5">

        <h1 className="text-2xl font-semibold text-center">Signup</h1>

        <input
          placeholder="Email"
          className="w-full p-3 bg-black/30 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 bg-black/30 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={signup} className="bg-green-500 w-full py-3 rounded">
          Create Account
        </button>

      </div>
    </div>
  )
}
