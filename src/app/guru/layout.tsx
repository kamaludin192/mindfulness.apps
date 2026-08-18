import Link from "next/link";
import { LayoutDashboard, Users, BookOpen, Settings, LogOut } from "lucide-react";

export default function GuruLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-surface border-r border-brand-300 flex-shrink-0 hidden md:flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-brand-300">
          <h1 className="text-2xl font-bold text-brand-900">Mindfulness</h1>
          <p className="text-sm text-brand-700">Portal Guru BK</p>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          <Link href="/guru" className="flex items-center px-4 py-3 text-brand-900 bg-brand-50 rounded-lg font-medium">
            <LayoutDashboard className="h-5 w-5 mr-3 text-brand-500" />
            Dashboard
          </Link>
          <Link href="/guru/siswa" className="flex items-center px-4 py-3 text-brand-700 hover:bg-brand-50 hover:text-brand-900 rounded-lg transition-colors">
            <Users className="h-5 w-5 mr-3 text-brand-500" />
            Data Siswa
          </Link>
          <Link href="/guru/materi" className="flex items-center px-4 py-3 text-brand-700 hover:bg-brand-50 hover:text-brand-900 rounded-lg transition-colors">
            <BookOpen className="h-5 w-5 mr-3 text-brand-500" />
            Manajemen Materi
          </Link>
          <Link href="/guru/pengaturan" className="flex items-center px-4 py-3 text-brand-700 hover:bg-brand-50 hover:text-brand-900 rounded-lg transition-colors">
            <Settings className="h-5 w-5 mr-3 text-brand-500" />
            Pengaturan
          </Link>
        </nav>
        <div className="p-4 border-t border-brand-300">
          <button className="flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full">
            <LogOut className="h-5 w-5 mr-3" />
            Keluar
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Mobile Header (visible only on small screens) */}
        <header className="md:hidden bg-surface border-b border-brand-300 p-4 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="font-bold text-brand-900 text-lg">Mindfulness</h1>
            <p className="text-xs text-brand-700">Portal Guru BK</p>
          </div>
          {/* A simple hamburger menu icon could go here for mobile sidebar toggle, but keeping it simple for layout */}
          <button className="p-2 text-brand-900 bg-brand-50 rounded-md">
            <LayoutDashboard className="h-5 w-5" />
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
