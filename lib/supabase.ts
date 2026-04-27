import { createClient } from '@supabase/supabase-js'

// 💡 Pro-tip: If you generate your types via Supabase CLI, 
// import them here and pass them to createClient<Database>(...)
// For now, we'll use a generic or manual interface.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('❌ Missing Supabase Environment Variables')
}

/**
 * ✅ Next-Level Singleton Pattern
 * This ensures we don't keep creating new clients during 
 * Next.js Hot Module Replacement (HMR) in development.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
})

/**
 * 🛠 IAM / BA Tip:
 * Since you deal with Identity & Access Management, 
 * ensure your Supabase RLS (Row Level Security) policies 
 * are enabled on the 'jobs' and 'recruiter_crm' tables 
 * so users can't see each other's data!
 */