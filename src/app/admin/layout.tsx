import { AdminSidebar, AdminMobileHeader } from "@/components/admin/AdminNav";

export const metadata = {
  title: "Superadmin CMS - mindfulnessintervention.id",
  description: "Portal Superadmin untuk Manajemen Pengguna, Materi, dan Seluruh Sistem",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col md:flex-row text-[#0f172a]">
      {/* Desktop Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Mobile Header */}
        <AdminMobileHeader />

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto space-y-8">
          {children}
        </main>
      </div>
    </div>
  );
}
