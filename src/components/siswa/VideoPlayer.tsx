'use client'

import { useState } from 'react'
import { markVideoWatched } from '@/app/siswa/worksheet/actions'
import { CheckCircle, PlayCircle } from 'lucide-react'

export default function VideoPlayer({ 
  sessionId, 
  videoUrl, 
  initialWatched 
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

  const embedUrl = videoUrl?.includes('youtube.com/watch') 
    ? videoUrl.replace('watch?v=', 'embed/')
    : videoUrl

  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-video w-full rounded-xl overflow-hidden bg-black relative shadow-sm">
        {videoUrl ? (
          <iframe 
            src={embedUrl} 
            title="Video Player"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-white/50">
            <PlayCircle className="w-12 h-12 mb-2" />
            <p>Video Not Available</p>
          </div>
        )}
      </div>

      {!isWatched ? (
        <button 
          onClick={handleWatchComplete}
          disabled={loading}
          className="w-full py-3 px-4 bg-brand-500 hover:bg-brand-700 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? 'Menyimpan...' : 'Saya sudah menonton video ini'}
        </button>
      ) : (
        <div className="w-full py-3 px-4 bg-brand-50 text-brand-900 font-medium rounded-xl flex items-center justify-center gap-2 border border-brand-300">
          <CheckCircle className="w-5 h-5 text-brand-500" />
          Video Selesai Ditonton
        </div>
      )}
    </div>
  )
}
