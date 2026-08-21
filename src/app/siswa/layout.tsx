import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Leaf } from 'lucide-react'
import { SiswaSidebar, SiswaBottomNav } from '@/components/siswa/SiswaNav'

export default async function SiswaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, role')
    .eq('id', user.id)
    .single()

  const fullName = profile?.full_name || user.user_metadata?.full_name || 'Siswa'
  const initial = fullName.charAt(0).toUpperCase()

  return (
    <div className="min-h-screen bg-[#f3f6e8] text-[#2b3a1a] selection:bg-[#c2db8f]/40 relative">
      {/* Fixed Desktop Sidebar (Locked/Non-moving on Desktop) */}
      <SiswaSidebar />

      {/* Mobile Top App Bar */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-[#d5dcc4] px-4 py-3 flex items-center justify-between shadow-xs md:hidden">
        <Link href="/siswa" className="flex items-center gap-2">
          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#3f5726] text-white">
            <Leaf className="w-4 h-4" />
          </span>
          <span className="font-serif font-bold text-sm text-[#1e2a14]">
            mindfulness<span className="text-[#3f5726] font-normal">.id</span>
          </span>
        </Link>

        <Link
          href="/siswa/profil"
          className="flex items-center gap-2 p-1 pr-2 rounded-full bg-[#f3f6e8] border border-[#d5dcc4] text-xs font-semibold text-[#1e2a14]"
        >
          <div className="w-6 h-6 rounded-full bg-[#3f5726] text-white flex items-center justify-center text-xs font-bold">
            {initial}
          </div>
          <span className="max-w-[100px] truncate">{fullName}</span>
        </Link>
      </header>

      {/* Main Page Area - Offset by sidebar width on desktop */}
      <div className="md:pl-64 flex flex-col min-h-screen min-w-0">
        <main className="flex-1 pb-24 md:pb-8">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <SiswaBottomNav />
    </div>
  )
}
