import { createClient } from '@supabase/supabase-js'

// SECURITY: Only NEXT_PUBLIC_* variables are exposed to browser
// NEXT_PUBLIC_SUPABASE_URL - Safe to expose (just the project URL)
// NEXT_PUBLIC_SUPABASE_ANON_KEY - Safe to expose (designed for client-side with RLS)
// SUPABASE_SERVICE_ROLE_KEY - NEVER expose (bypasses RLS, server-only)

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Validate environment variables without logging sensitive data
if (!supabaseUrl || !supabaseAnonKey) {
  if (typeof window === 'undefined') {
    // Only log on server-side during build
    console.warn('[Supabase] Missing environment variables')
  }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

// Types for our database
export interface Comment {
  id: string
  name: string
  message: string
  profile_photo_url?: string
  created_at: string
  likes: number
  pinned?: boolean
  hidden?: boolean
}

export interface CommentInsert {
  name: string
  message: string
  profile_photo_url?: string
  pinned?: boolean
  hidden?: boolean
}
