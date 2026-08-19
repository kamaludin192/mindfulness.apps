'use client'

import { useState } from 'react'
import { markVideoWatched } from '@/app/siswa/worksheet/actions'
import { CheckCircle2, PlayCircle, Eye } from 'lucide-react'

export default function VideoPlayer({
  sessionId,
  videoUrl,
  initialWatched,
}: {
  sessionId: string
  videoUrl: string
  initialWatched: boolean
}) {
  const [isWatched, setIsWatched] = useState(initialWatched)
  const [loading, setLoading] = useState(false)

  const handleWatchComplete = async () => {
    setLoading(true)
    try {
      await markVideoWatched(sessionId)
      setIsWatched(true)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const embedUrl = videoUrl?.includes('youtu.be/')
    ? videoUrl.replace('youtu.be/', 'youtube.com/embed/')
    : videoUrl?.includes('youtube.com/watch')
    ? videoUrl.replace('watch?v=', 'embed/')
    : videoUrl

  return (
    <div className="flex flex-col gap-4">
      {/* Video Container */}
      <div className="aspect-video w-full rounded-2xl overflow-hidden bg-[#1e2a14] relative shadow-md border border-[#d5dcc4]">
        {videoUrl ? (
          <iframe
            src={embedUrl}
            title="Video Materi Mindfulness"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-white/60 p-6 text-center">
            <PlayCircle className="w-12 h-12 mb-2 text-[#c2db8f]" />
            <p className="text-sm font-medium">Video panduan sedang dipersiapkan.</p>
          </div>
        )}
      </div>

      {/* Action Button / Completed State */}
      {!isWatched ? (
        <button
          type="button"
          onClick={handleWatchComplete}
          disabled={loading}
          className="w-full py-3.5 px-5 bg-[#3f5726] hover:bg-[#2b3a1a] text-white font-semibold text-xs md:text-sm rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xs hover:shadow-md hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
          <span>{loading ? 'Menyimpan Progres...' : 'Saya Sudah Selesai Menonton Video'}</span>
        </button>
      ) : (
        <div className="w-full py-3 px-4 bg-[#f3f6e8] text-[#3f5726] font-semibold text-xs md:text-sm rounded-2xl flex items-center justify-center gap-2 border border-[#d5dcc4]">
          <CheckCircle2 className="w-4 h-4 text-[#3f5726]" />
          <span>Video Telah Selesai Ditonton • Lembar Kerja Terbuka</span>
        </div>
      )}
    </div>
  )
}
