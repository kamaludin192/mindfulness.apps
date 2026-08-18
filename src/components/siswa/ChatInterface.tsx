'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import { sendMessage } from '@/app/siswa/chat/actions'
import { Send } from 'lucide-react'

export default function ChatInterface({ 
  currentUserId,
  guruId,
  initialMessages 
}: { 
  currentUserId: string
  guruId: string
  initialMessages: Array<{ id: string; sender_id: string; receiver_id: string; message: string; created_at?: string }>
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
          const newMsg = payload.new as { id: string; sender_id: string; receiver_id: string; message: string; created_at?: string }
          if (
            (newMsg.sender_id === currentUserId && newMsg.receiver_id === guruId) ||
            (newMsg.sender_id === guruId && newMsg.receiver_id === currentUserId)
          ) {
            setMessages((prev) => {
              if (prev.some(m => m.id === newMsg.id)) return prev;
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
    <div className="flex flex-col h-[500px] bg-white rounded-3xl shadow-sm border border-brand-50 overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-brand-50/30">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            Belum ada pesan. Mulai percakapan dengan Guru BK.
          </div>
        ) : (
          messages.map((msg, idx) => {
            const isMe = msg.sender_id === currentUserId
            return (
              <div key={msg.id || idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                    isMe 
                      ? 'bg-brand-500 text-white rounded-br-sm' 
                      : 'bg-white text-brand-900 rounded-bl-sm border border-brand-50 shadow-sm'
                  }`}
                >
                  <p>{msg.message}</p>
                </div>
              </div>
            )
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="p-3 bg-white border-t border-brand-50 flex gap-2">
        <input 
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Tulis pesan..."
          className="flex-1 rounded-full px-4 py-2 border border-brand-300 focus:ring-2 focus:ring-brand-500 outline-none bg-brand-50/50"
        />
        <button 
          type="submit"
          disabled={!newMessage.trim() || sending}
          className="w-10 h-10 rounded-full bg-brand-900 text-white flex items-center justify-center hover:bg-brand-700 transition-colors disabled:opacity-50 shrink-0"
        >
          <Send className="w-5 h-5 -ml-0.5" />
        </button>
      </form>
    </div>
  )
}
