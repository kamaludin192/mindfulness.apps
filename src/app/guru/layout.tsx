import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { GuruSidebar, GuruMobileHeader } from "@/components/guru/GuruNav";
import NotificationBell from "@/components/shared/NotificationBell";
import { fetchUserNotifications } from "@/lib/notifications";

export const metadata = {
  title: "Portal Guru BK - mindfulnessintervention.id",
};

export default async function GuruLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role, nip")
    .eq("id", user.id)
    .single();

  const fullName = profile?.full_name || "Guru BK";
  const initial = fullName.charAt(0).toUpperCase();
  const notifications = await fetchUserNotifications(supabase, user.id, "guru_bk");

  return (
    <div className="min-h-screen bg-[#f5f8ec] flex flex-col md:flex-row text-[#0f172a]">
      {/* Desktop Sidebar */}
      <GuruSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Mobile Header with Notification */}
        <GuruMobileHeader notifications={notifications} />

        {/* Desktop Top Header Bar with Notifications & Quick Profile */}
        <header className="hidden md:flex items-center justify-between px-8 py-3.5 bg-white/75 backdrop-blur-md border-b border-[#d5dcc4] sticky top-0 z-30">
          <div className="flex items-center gap-2 text-xs font-bold text-[#057a44]">
            <span className="w-2 h-2 rounded-full bg-[#057a44] animate-pulse" />
            <span>Sistem Bimbingan Konseling & Intervensi Aktif</span>
          </div>

          <div className="flex items-center gap-3">
            <NotificationBell notifications={notifications} role="guru_bk" />
            <Link
              href="/guru/profil"
              className="flex items-center gap-2 p-1.5 pr-3.5 rounded-2xl bg-[#f8fafc] border border-slate-200 text-xs font-bold text-[#0f172a] hover:bg-slate-100 transition-colors shadow-2xs"
            >
              <div className="w-6 h-6 rounded-xl bg-[#057a44] text-white flex items-center justify-center text-xs font-extrabold">
                {initial}
              </div>
              <span className="max-w-[160px] truncate">{fullName}</span>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
