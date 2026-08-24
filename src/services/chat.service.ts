import { createClient } from '@/lib/supabase/server'
import type { ChatMessage } from '@/types/chat'

export async function sendChatMessage(
  senderId: string,
  receiverId: string,
  message: string
): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase.from('chat_messages').insert({
    sender_id: senderId,
    receiver_id: receiverId,
    message,
  })

  if (error) throw new Error(error.message)
}

export async function getConversationMessages(
  userId1: string,
  userId2: string
): Promise<ChatMessage[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('chat_messages')
    .select(`
      id,
      sender_id,
      receiver_id,
      message,
      created_at
    `)
    .or(`and(sender_id.eq.${userId1},receiver_id.eq.${userId2}),and(sender_id.eq.${userId2},receiver_id.eq.${userId1})`)
    .order('created_at', { ascending: true })

  if (error) {
    console.warn('Error fetching conversation:', error.message)
    return []
  }

  return (data || []) as unknown as ChatMessage[]
}
