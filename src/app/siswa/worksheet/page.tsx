import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import VideoPlayer from '@/components/siswa/VideoPlayer'
import WorksheetForm from '@/components/siswa/WorksheetForm'
import { BookOpen } from 'lucide-react'

export const metadata = {
  title: 'Worksheet - Siswa',
}

export default async function WorksheetPage({ searchParams }: { searchParams: { session?: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: sessions } = await supabase
    .from('cms_contents')
    .select('*')
    .order('session_number', { ascending: true })

  if (!sessions || sessions.length === 0) {
    return <div className="p-4 text-center mt-10 text-gray-500">Belum ada sesi yang tersedia.</div>
  }

  const activeSessionId = searchParams.session || sessions[0].id
  const activeSession = sessions.find(s => s.id === activeSessionId) || sessions[0]

  const { data: progress } = await supabase
    .from('exercise_progress')
    .select('*')
    .eq('student_id', user.id)
    .eq('session_id', activeSession.id)
    .single()

  const isVideoWatched = progress?.is_video_watched || false
  const worksheetData = progress?.worksheet_data || null
  const status = progress?.status || null

  return (
    <div className="min-h-screen bg-brand-50 pb-[env(safe-area-inset-bottom)] pb-24">
      <header className="bg-brand-500 text-white p-4 sticky top-0 z-10 shadow-md">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <BookOpen className="w-6 h-6" />
          Pembelajaran
        </h1>
      </header>

      <main className="p-4 max-w-lg mx-auto">
        <div className="flex gap-2 overflow-x-auto pb-4 snap-x hide-scrollbar scrollbar-hide">
          {sessions.map((s) => (
            <a 
              key={s.id} 
              href={`/siswa/worksheet?session=${s.id}`}
              className={`snap-center whitespace-nowrap px-4 py-2 rounded-full font-medium transition-colors border ${
                s.id === activeSession.id 
                  ? 'bg-brand-900 text-white border-brand-900 shadow-sm' 
                  : 'bg-white text-brand-700 border-brand-300 hover:bg-brand-100'
              }`}
            >
              Sesi {s.session_number}
            </a>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-5 shadow-sm border border-brand-100">
          <h2 className="text-2xl font-bold text-brand-900 mb-4">{activeSession.title}</h2>
          
          <VideoPlayer 
            sessionId={activeSession.id}
            videoUrl={activeSession.video_url || ''}
            initialWatched={isVideoWatched}
          />

          {isVideoWatched && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <WorksheetForm 
                sessionId={activeSession.id}
                initialData={worksheetData}
                status={status}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
