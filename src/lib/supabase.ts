import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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
