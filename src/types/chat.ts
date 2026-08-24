export interface ChatMessage {
  id: string
  booking_id?: string
  sender_id: string
  receiver_id: string
  message: string
  created_at: string
  sender?: {
    id: string
    full_name: string
    role: string
  }
}
