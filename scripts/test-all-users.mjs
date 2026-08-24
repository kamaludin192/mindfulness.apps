import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pvrybzfzvrzfwvnffsmx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2cnliemZ6dnJ6Znd2bmZmc214Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcwNzc5NTYsImV4cCI6MjEwMjY1Mzk1Nn0.dewWXP-IS53f1eU9kQ4jI3zHG2fLEbybTOLhL9GCpc4'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testUser(email, password) {
  console.log(`\nTesting ${email}...`)
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) {
    console.log(`Error for ${email}:`, error.message)
  } else {
    console.log(`SUCCESS login for ${email}! ID: ${data.user.id}`)
    const { data: profile } = await supabase.from('profiles').select('*').eq('id', data.user.id).single()
    console.log("Profile:", profile)
  }
}

async function main() {
  await testUser('siswa@mindfulness.id', 'password123')
  await testUser('guru@mindfulness.id', 'password123')
  await testUser('admin@mindfulness.id', 'password123')
}

main().catch(console.error)
