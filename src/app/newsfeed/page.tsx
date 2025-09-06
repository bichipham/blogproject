// app/page.tsx
"use client"
// import { Search, User } from "lucide-react"

export default function NewsFeedPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="sticky top-0 bg-white shadow flex items-center justify-between px-6 py-3 z-50">
        {/* Logo */}
        <div className="font-bold text-lg">MySocial</div>

        {/* Search */}
        <div className="flex-1 max-w-md mx-6">
          <div className="flex items-center bg-gray-100 rounded-full px-3 py-2">
            {/* <Search className="w-5 h-5 text-gray-500 mr-2" /> */}
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none flex-1"
            />
          </div>
        </div>

        {/* Profile Icon */}
        <button className="rounded-full bg-gray-200 p-2">
          {/* <User className="w-6 h-6 text-gray-600" /> */}
        </button>
      </header>

      {/* Content */}
      <main className="flex-1 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 p-6">
        {/* Left column */}
        <div className="bg-white rounded-xl shadow p-4 md:col-span-1">
          <h2 className="font-semibold mb-2">Left Sidebar</h2>
          <p className="text-sm text-gray-600">Some widgets or navigation here.</p>
        </div>

        {/* Center column (wider feed) */}
        <div className="bg-white rounded-xl shadow p-4 md:col-span-2 lg:col-span-3">
          <h2 className="font-semibold mb-2">Newsfeed</h2>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className="border rounded-lg p-3 hover:bg-gray-50"
              >
                <h3 className="font-semibold">Post {i}</h3>
                <p className="text-sm text-gray-600">
                  This is the content of post {i}.
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right column (hidden on small screens) */}
        <div className="hidden lg:block bg-white rounded-xl shadow p-4 lg:col-span-2">
          <h2 className="font-semibold mb-2">Right Sidebar</h2>
          <p className="text-sm text-gray-600">Trending topics / suggestions.</p>
        </div>
      </main>
    </div>
  )
}
