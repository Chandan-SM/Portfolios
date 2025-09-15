import Link from "next/link";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">Welcome back 👋</h1>
      <p className="text-gray-600 mb-6">Here’s your portfolio progress so far.</p>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 shadow rounded">Portfolios: 0</div>
        <div className="bg-white p-4 shadow rounded">Templates Tried: 0</div>
        <div className="bg-white p-4 shadow rounded">Visitors: 0</div>
      </div>

      {/* Recent Portfolios */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Portfolios</h2>
        <div className="bg-white p-4 shadow rounded mb-4">
          <p>No portfolios yet.</p>
        </div>
        <Link href="/create-portfolio">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Create New Portfolio
          </button>
        </Link>
      </div>
    </div>
  );
}
