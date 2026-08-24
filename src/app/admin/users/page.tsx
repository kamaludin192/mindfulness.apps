import UserManagementTable from "@/components/admin/UserManagementTable";
import { Users } from "lucide-react";
import { getCurrentUser } from "@/services/auth.service";
import { getAllProfiles } from "@/services/profile.service";

export const metadata = {
  title: "Manajemen Akun & Role - Superadmin CMS",
};

export default async function AdminUsersPage() {
  const currentUser = await getCurrentUser();
  const users = await getAllProfiles();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-xs font-extrabold text-amber-800 border border-amber-500/30 mb-2">
          <Users className="w-3.5 h-3.5" />
          <span>Manajemen Pengguna & Otoritas</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-[#0f172a]">
          Manajemen Akun & Hak Akses (Role)
        </h1>
        <p className="text-xs sm:text-sm text-[#334155] font-medium max-w-3xl leading-relaxed">
          Kelola seluruh akun terdaftar di sistem. Anda dapat menaikkan atau mengubah role pengguna menjadi Siswa, Guru BK, atau Superadmin secara langsung.
        </p>
      </div>

      {/* Interactive Table */}
      <UserManagementTable
        initialUsers={users || []}
        currentAdminId={currentUser?.id || ""}
      />
    </div>
  );
}
