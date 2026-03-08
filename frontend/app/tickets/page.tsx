'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getTickets } from '@/lib/api'
import { Ticket } from '@/types/ticket'

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTickets() {
      try {
        const data = await getTickets()
        setTickets(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'エラーが発生しました')
      } finally {
        setLoading(false)
      }
    }

    fetchTickets()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">読み込み中...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-red-500">エラー: {error}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">チケット一覧</h1>
          <Link
            href="/tickets/new"
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            新規作成
          </Link>
        </div>

        {tickets.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            チケットがありません
          </div>
        ) : (
          <div className="grid gap-4">
            {tickets.map((ticket) => (
              <Link
                key={ticket.id}
                href={`/tickets/${ticket.id}`}
                className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold mb-2">{ticket.title}</h2>
                    <p className="text-gray-600 mb-2 line-clamp-2">
                      {ticket.description}
                    </p>
                    {ticket.point !== undefined && (
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        ポイント: {ticket.point}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-8">
          <Link
            href="/"
            className="text-blue-500 hover:underline"
          >
            ← ホームに戻る
          </Link>
        </div>
      </div>
    </div>
  )
}
