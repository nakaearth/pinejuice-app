import { Ticket, TicketFormData } from '@/types/ticket'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export async function getTickets(): Promise<Ticket[]> {
  const response = await fetch(`${API_BASE_URL}/api/tickets`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  
  if (!response.ok) {
    throw new Error('Failed to fetch tickets')
  }
  
  return response.json()
}

export async function getTicket(id: number): Promise<Ticket> {
  const response = await fetch(`${API_BASE_URL}/api/tickets/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  
  if (!response.ok) {
    throw new Error('Failed to fetch ticket')
  }
  
  return response.json()
}

export async function createTicket(data: TicketFormData): Promise<Ticket> {
  const response = await fetch(`${API_BASE_URL}/api/tickets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to create ticket')
  }
  
  return response.json()
}
