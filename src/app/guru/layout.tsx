import { GuruSidebar, GuruMobileHeader } from "@/components/guru/GuruNav";

export const metadata = {
  title: "Portal Guru BK - mindfulnessintervention.id",
};

export default function GuruLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f5f8ec] flex flex-col md:flex-row text-[#0f172a]">
      {/* Desktop Sidebar */}
      <GuruSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Mobile Header */}
        <GuruMobileHeader />

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
