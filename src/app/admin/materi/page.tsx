import { createClient } from "@/lib/supabase/server";
import CmsMateriEditor from "@/components/admin/CmsMateriEditor";
import { Video } from "lucide-react";

export const metadata = {
  title: "CMS Materi 4 Sesi - Superadmin CMS",
};

export default async function AdminMateriPage() {
  const supabase = createClient();

  const { data: cmsSessions, error } = await supabase
    .from("cms_contents")
    .select("session_number, title, video_url")
    .order("session_number", { ascending: true });

  if (error) {
    console.warn("Could not fetch CMS sessions, using defaults:", error.message);
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-xs font-extrabold text-amber-800 border border-amber-500/30 mb-2">
          <Video className="w-3.5 h-3.5" />
          <span>CMS Kurikulum & Media Pembelajaran</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-[#0f172a]">
          CMS Manajemen Materi & Video 4 Sesi
        </h1>
        <p className="text-xs sm:text-sm text-[#334155] font-medium max-w-3xl leading-relaxed">
          Ubah judul materi, link video panduan mindfulness (YouTube / MP4), dan deskripsi untuk Sesi 1 sampai Sesi 4 secara langsung ke database.
        </p>
      </div>

      {/* Editor Component */}
      <CmsMateriEditor initialSessions={cmsSessions} />
    </div>
  );
}
