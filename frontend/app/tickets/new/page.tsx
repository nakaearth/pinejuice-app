'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createTicket } from '@/lib/api'
import { TicketFormData } from '@/types/ticket'

export default function NewTicketPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<TicketFormData>({
    title: '',
    description: '',
    point: 0,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const ticket = await createTicket(formData)
      router.push(`/tickets/${ticket.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'チケットの作成に失敗しました')
      setLoading(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'point' ? parseInt(value, 10) || 0 : value,
    }))
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">新しいチケットを作成</h1>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              タイトル <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              maxLength={80}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="チケットのタイトルを入力"
            />
            <p className="mt-1 text-sm text-gray-500">
              {formData.title.length}/80 文字
            </p>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2">
              説明 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              maxLength={1024}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="チケットの説明を入力"
            />
            <p className="mt-1 text-sm text-gray-500">
              {formData.description.length}/1024 文字
            </p>
          </div>

          <div>
            <label htmlFor="point" className="block text-sm font-medium mb-2">
              ポイント
            </label>
            <input
              type="number"
              id="point"
              name="point"
              value={formData.point}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? '作成中...' : '作成'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              キャンセル
            </button>
          </div>
        </form>

        <div className="mt-8">
          <a
            href="/tickets"
            className="text-blue-500 hover:underline"
          >
            ← 一覧に戻る
          </a>
        </div>
      </div>
    </div>
  )
}
