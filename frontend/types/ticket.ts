export interface Ticket {
  id: number
  title: string
  description: string
  point?: number
  user_id?: number
  created_at?: string
  updated_at?: string
}

export interface TicketFormData {
  title: string
  description: string
  point: number
}
