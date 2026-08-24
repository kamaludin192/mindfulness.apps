import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pvrybzfzvrzfwvnffsmx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2cnliemZ6dnJ6Znd2bmZmc214Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcwNzc5NTYsImV4cCI6MjEwMjY1Mzk1Nn0.dewWXP-IS53f1eU9kQ4jI3zHG2fLEbybTOLhL9GCpc4'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function main() {
  console.log("Signing in with guru@mindfulness.id...")
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'guru@mindfulness.id',
    password: 'password123',
  })

  if (error) {
    console.error("Login Error:", error.message)
    return
  }

  console.log("Logged in guru ID:", data.user.id)
  
  // Let's check profile
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', data.user.id).single()
  console.log("Current Guru Profile:", profile)

  // Try updating role to superadmin
  const { error: updErr } = await supabase
    .from('profiles')
    .update({ role: 'superadmin' })
    .eq('id', data.user.id)

  console.log("Update result:", updErr?.message || "SUCCESS promoted guru to superadmin!")

  // Verify
  const { data: verifyProf } = await supabase.from('profiles').select('*').eq('id', data.user.id).single()
  console.log("Verified Profile:", verifyProf)
}

main().catch(console.error)
