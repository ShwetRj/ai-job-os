"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function UpdatePassword() {
  const [password, setPassword] = useState("")

  async function update() {
    const { error } = await supabase.auth.updateUser({
      password,
    })

    if (error) alert(error.message)
    else {
      alert("Password updated")
      window.location.href = "/login"
    }
  }

  return (
    <div className="flex justify-center mt-20">
      <div className="bg-white/5 p-6 rounded-xl w-80">

        <h1 className="mb-4">Set New Password</h1>

        <input
          type="password"
          placeholder="New Password"
          className="w-full mb-3 p-2"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={update} className="bg-green-500 w-full py-2">
          Update Password
        </button>

      </div>
    </div>
  )
}
