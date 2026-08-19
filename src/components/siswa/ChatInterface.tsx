'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import { sendMessage } from '@/app/siswa/chat/actions'
import { Send, MessageSquareQuote, Shield } from 'lucide-react'

export default function ChatInterface({
  currentUserId,
  guruId,
  guruName,
  initialMessages,
}: {
  currentUserId: string
  guruId: string
  guruName: string
  initialMessages: Array<{
    id: string
    sender_id: string
    receiver_id: string
    message: string
    created_at?: string
  }>
}) {
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState('')
  const [sending, setSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const supabase = useMemo(() => createClient(), [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    const channel = supabase
      .channel('chat_messages_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
        },
        (payload) => {
          const newMsg = payload.new as {
            id: string
            sender_id: string
            receiver_id: string
            message: string
            created_at?: string
          }
          if (
            (newMsg.sender_id === currentUserId && newMsg.receiver_id === guruId) ||
            (newMsg.sender_id === guruId && newMsg.receiver_id === currentUserId)
          ) {
            setMessages((prev) => {
              if (prev.some((m) => m.id === newMsg.id)) return prev
              return [...prev, newMsg]
            })
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [currentUserId, guruId, supabase])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || sending) return

    const msg = newMessage.trim()
    setNewMessage('')
    setSending(true)

    try {
      await sendMessage(guruId, msg)
    } catch (e) {
      console.error(e)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="flex flex-col h-[520px] bg-white rounded-3xl border border-[#d5dcc4] shadow-xs overflow-hidden">
      {/* Chat Window Header */}
      <div className="bg-[#f3f6e8] px-5 py-3.5 border-b border-[#d5dcc4] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#3f5726] text-white flex items-center justify-center text-sm font-bold">
            {guruName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h4 className="text-xs md:text-sm font-bold text-[#1e2a14]">{guruName}</h4>
            <p className="text-[10px] text-[#3f5726] font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3f5726] animate-pulse" />
              Guru Bimbingan Konseling
            </p>
          </div>
        </div>

        <span className="text-[11px] text-[#2b3a1a]/60 hidden sm:flex items-center gap-1">
          <Shield className="w-3.5 h-3.5 text-[#3f5726]" />
          Enkripsi Privat
        </span>
      </div>

      {/* Messages List Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-3 bg-[#f8fafc]/50">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6 text-[#2b3a1a]/60 space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#f3f6e8] border border-[#d5dcc4] flex items-center justify-center text-[#3f5726]">
              <MessageSquareQuote className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-[#1e2a14]">Ruang Obrolan Terbuka</p>
            <p className="text-xs max-w-xs leading-relaxed">
              Mulai percakapan atau tanyakan hal apa pun yang ingin kamu diskusikan bersama {guruName}.
            </p>
          </div>
        ) : (
          messages.map((msg, idx) => {
            const isMe = msg.sender_id === currentUserId
            const timeStr = msg.created_at
              ? new Date(msg.created_at).toLocaleTimeString('id-ID', {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : ''

            return (
              <div
                key={msg.id || idx}
                className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-4 py-2.5 text-xs md:text-sm shadow-xs space-y-1 ${
                    isMe
                      ? 'bg-[#3f5726] text-white rounded-br-xs'
                      : 'bg-white text-[#1e2a14] border border-[#d5dcc4] rounded-bl-xs'
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                  {timeStr && (
                    <p
                      className={`text-[9px] text-right ${
                        isMe ? 'text-white/70' : 'text-[#2b3a1a]/50'
                      }`}
                    >
                      {timeStr}
                    </p>
                  )}
                </div>
              </div>
            )
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form Bar */}
      <form
        onSubmit={handleSend}
        className="p-3 md:p-4 bg-white border-t border-[#d5dcc4] flex items-center gap-2"
      >
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Tulis pesan atau pertanyaanmu di sini..."
          className="flex-1 px-4 py-3 rounded-2xl border border-[#d5dcc4] bg-[#f8fafc] text-xs md:text-sm text-[#1e2a14] placeholder-[#2b3a1a]/40 focus:outline-none focus:ring-2 focus:ring-[#3f5726] focus:border-transparent transition-all"
        />
        <button
          type="submit"
          disabled={!newMessage.trim() || sending}
          className="p-3 bg-[#3f5726] hover:bg-[#2b3a1a] text-white rounded-2xl transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-xs shrink-0"
          aria-label="Kirim Pesan"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  )
}
