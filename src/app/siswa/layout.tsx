import Link from "next/link";
import { Home, BookHeart, UserCircle } from "lucide-react";

export default function SiswaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-brand-50 flex flex-col">
      {/* Mobile Top App Bar */}
      <header className="sticky top-0 z-10 bg-white border-b border-brand-300 px-4 py-3 flex items-center justify-between shadow-sm md:hidden">
        <h1 className="text-lg font-bold text-brand-900">Mindfulness App</h1>
        <div className="w-8 h-8 rounded-full bg-brand-300 flex items-center justify-center text-brand-900 font-semibold">
          S
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar (hidden on mobile) */}
        <aside className="hidden md:flex flex-col w-64 bg-white border-r border-brand-300 h-[calc(100vh)] sticky top-0">
          <div className="p-6 border-b border-brand-300">
            <h1 className="text-xl font-bold text-brand-900">Mindfulness</h1>
            <p className="text-sm text-brand-700">Portal Siswa</p>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-2">
            <Link href="/siswa" className="flex items-center px-4 py-3 text-brand-900 bg-brand-50 rounded-lg font-medium">
              <Home className="h-5 w-5 mr-3 text-brand-500" />
              Beranda
            </Link>
            <Link href="/siswa/materi" className="flex items-center px-4 py-3 text-brand-700 hover:bg-brand-50 hover:text-brand-900 rounded-lg transition-colors">
              <BookHeart className="h-5 w-5 mr-3 text-brand-500" />
              Materi
            </Link>
            <Link href="/siswa/profil" className="flex items-center px-4 py-3 text-brand-700 hover:bg-brand-50 hover:text-brand-900 rounded-lg transition-colors">
              <UserCircle className="h-5 w-5 mr-3 text-brand-500" />
              Profil
            </Link>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-brand-300 flex justify-around items-center h-16 px-2 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20">
        <Link href="/siswa" className="flex flex-col items-center justify-center w-full h-full text-brand-700 hover:text-brand-900">
          <Home className="h-6 w-6 mb-1 text-brand-500" />
          <span className="text-[10px] font-medium">Beranda</span>
        </Link>
        <Link href="/siswa/materi" className="flex flex-col items-center justify-center w-full h-full text-brand-700 hover:text-brand-900">
          <BookHeart className="h-6 w-6 mb-1" />
          <span className="text-[10px] font-medium">Materi</span>
        </Link>
        <Link href="/siswa/profil" className="flex flex-col items-center justify-center w-full h-full text-brand-700 hover:text-brand-900">
          <UserCircle className="h-6 w-6 mb-1" />
          <span className="text-[10px] font-medium">Profil</span>
        </Link>
      </nav>
    </div>
  );
}
