import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pvrybzfzvrzfwvnffsmx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2cnliemZ6dnJ6Znd2bmZmc214Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcwNzc5NTYsImV4cCI6MjEwMjY1Mzk1Nn0.dewWXP-IS53f1eU9kQ4jI3zHG2fLEbybTOLhL9GCpc4'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function main() {
  console.log("Signing in...")
  const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
    email: 'admin@mindfulness.id',
    password: 'password123',
  })

  console.log("Login Error:", loginError?.message)
  console.log("Login User:", loginData?.user?.id, loginData?.user?.email)

  if (loginData?.user) {
    const { data: profile, error: profileErr } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', loginData.user.id)
      .single()
    console.log("Current Profile in DB:", profile)
    console.log("Profile Err:", profileErr)

    if (profile && profile.role !== 'superadmin') {
      console.log("Updating profile role to superadmin...")
      const { error: updErr } = await supabase
        .from('profiles')
        .update({ role: 'superadmin' })
        .eq('id', loginData.user.id)
      console.log("Update role result:", updErr?.message || "Success!")
    }
  }
}

main().catch(console.error)
