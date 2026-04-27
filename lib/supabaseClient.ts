import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// ✅ Fail-fast: As a BA, you know clear error messaging prevents debugging headaches.
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "❌ Missing Supabase Environment Variables. Check your .env.local file."
  )
}

/**
 * ✅ Next-Level Singleton Pattern
 * We export a single, stable instance of the Supabase client.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true, // Keeps you logged in across browser restarts
    autoRefreshToken: true, // Automatically handles token expiration
    detectSessionInUrl: true // Required for Magic Link and OAuth (Google/GitHub)
  }
})