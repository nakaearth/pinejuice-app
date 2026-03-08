'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { getTicket } from '@/lib/api'
import { Ticket } from '@/types/ticket'

export default function TicketDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [ticket, setTicket] = useState<Ticket | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTicket() {
      try {
        const id = parseInt(params.id as string, 10)
        if (isNaN(id)) {
          throw new Error('Invalid ticket ID')
        }
        const data = await getTicket(id)
        setTicket(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'エラーが発生しました')
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchTicket()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">読み込み中...</div>
        </div>
      </div>
    )
  }

  if (error || !ticket) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-red-500">エラー: {error || 'チケットが見つかりません'}</div>
          <div className="mt-4">
            <Link href="/tickets" className="text-blue-500 hover:underline">
              ← 一覧に戻る
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            href="/tickets"
            className="text-blue-500 hover:underline"
          >
            ← 一覧に戻る
          </Link>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-4">{ticket.title}</h1>
            {ticket.point !== undefined && (
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full">
                ポイント: {ticket.point}
              </span>
            )}
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">説明</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{ticket.description}</p>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              {ticket.user_id && (
                <div>
                  <span className="font-medium">ユーザーID:</span> {ticket.user_id}
                </div>
              )}
              {ticket.created_at && (
                <div>
                  <span className="font-medium">作成日時:</span>{' '}
                  {new Date(ticket.created_at).toLocaleString('ja-JP')}
                </div>
              )}
              {ticket.updated_at && (
                <div>
                  <span className="font-medium">更新日時:</span>{' '}
                  {new Date(ticket.updated_at).toLocaleString('ja-JP')}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
