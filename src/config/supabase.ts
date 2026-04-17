import { createClient } from '@supabase/supabase-js'
import { env } from './env'

// Admin client — bypasses Row Level Security
// NEVER expose or use this on the client side
export const supabaseAdmin = createClient(
  env.SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)
