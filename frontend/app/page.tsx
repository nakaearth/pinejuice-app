import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Pinejuice Ticket Management</h1>
        <div className="space-y-4">
          <Link
            href="/tickets"
            className="block p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            チケット一覧を見る
          </Link>
          <Link
            href="/tickets/new"
            className="block p-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            新しいチケットを作成
          </Link>
        </div>
      </div>
    </main>
  )
}
