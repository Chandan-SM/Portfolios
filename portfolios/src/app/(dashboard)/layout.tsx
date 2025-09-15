import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-white shadow">
        <div className="text-xl font-bold">Portfolio Maker</div>
        <div className="flex gap-6">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/portfolios">Portfolios</Link>
          <Link href="/templates">Templates</Link>
          <Link href="/settings">Settings</Link>
          <form action="/auth" method="post">
            <button type="submit" className="text-red-600">Logout</button>
          </form>
        </div>
      </nav>

      {/* Page Content */}
      <main className="p-6">{children}</main>
    </div>
  );
}
