import { createClient } from "@/lib/supabase/server";
import { getLayoutConfigAction } from "@/app/admin/tampilan/actions";
import LayoutCmsEditor from "@/components/admin/LayoutCmsEditor";
import { Palette } from "lucide-react";

export const metadata = {
  title: "Pengaturan Tampilan & UI - Superadmin CMS",
};

export default async function AdminLayoutCmsPage() {
  const supabase = createClient();

  const { data: user, error: authError } = await supabase.auth.getUser();
  if (authError || !user?.user) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl border border-slate-200">
        <p className="font-bold text-base text-[#0f172a]">Silakan login sebagai Superadmin.</p>
      </div>
    );
  }

  const currentConfig = await getLayoutConfigAction();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-xs font-extrabold text-amber-800 border border-amber-500/30 mb-2">
          <Palette className="w-3.5 h-3.5" />
          <span>Visual Layout & Content Management System</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-[#0f172a]">
          Pengaturan Tampilan Antarmuka
        </h1>
        <p className="text-xs sm:text-sm text-[#334155] font-medium max-w-3xl leading-relaxed">
          Kustomisasi teks, judul hero, salam motivasi, pengumuman, dan banner pada <strong>Landing Page</strong>, <strong>Portal Murid</strong>, dan <strong>Portal Guru</strong> secara fleksibel dan langsung diterapkan ke seluruh sistem.
        </p>
      </div>

      {/* Interactive Visual CMS Editor */}
      <LayoutCmsEditor initialConfig={currentConfig} />
    </div>
  );
}
