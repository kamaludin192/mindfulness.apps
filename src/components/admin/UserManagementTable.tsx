'use client'

import { useState } from 'react'
import {
  Users,
  Search,
  CheckCircle2,
  Shield,
  GraduationCap,
  AlertCircle,
} from 'lucide-react'
import { updateUserRole } from '@/app/admin/actions'

export type UserProfile = {
  id: string
  full_name: string | null
  role: 'siswa' | 'guru_bk' | 'superadmin'
  created_at: string
}

export default function UserManagementTable({
  initialUsers,
  currentAdminId,
}: {
  initialUsers: UserProfile[]
  currentAdminId: string
}) {
  const [users, setUsers] = useState<UserProfile[]>(initialUsers)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>('all')
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  // Filter users
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole =
      selectedRoleFilter === 'all' || user.role === selectedRoleFilter

    return matchesSearch && matchesRole
  })

  // Handle Role Change
  const handleRoleChange = async (
    userId: string,
    newRole: 'siswa' | 'guru_bk' | 'superadmin'
  ) => {
    if (userId === currentAdminId && newRole !== 'superadmin') {
      const confirmChange = window.confirm(
        'PERINGATAN: Anda sedang mengubah role akun Anda sendiri. Anda akan kehilangan hak akses Superadmin. Lanjutkan?'
      )
      if (!confirmChange) return
    }

    setLoadingUserId(userId)
    setErrorMsg(null)
    setSuccessMsg(null)

    try {
      await updateUserRole(userId, newRole)
      setUsers(
        users.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
      )
      setSuccessMsg(`Role akun berhasil diubah menjadi "${newRole}".`)
      setTimeout(() => setSuccessMsg(null), 4000)
    } catch (err) {
      console.error(err)
      setErrorMsg(err instanceof Error ? err.message : 'Gagal mengubah role user.')
    } finally {
      setLoadingUserId(null)
    }
  }

  return (
    <div className="space-y-4">
      {/* Alert Messages */}
      {successMsg && (
        <div className="p-4 bg-emerald-50 border-2 border-emerald-300 text-[#065f46] rounded-2xl text-xs font-extrabold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#057a44] shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 bg-red-50 border-2 border-red-300 text-red-800 rounded-2xl text-xs font-extrabold flex items-center gap-2 animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border-2 border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nama atau user ID..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#f8fafc] border border-slate-200 rounded-2xl text-xs sm:text-sm text-[#0f172a] placeholder-slate-400 outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
          />
        </div>

        {/* Role Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {[
            { key: 'all', label: 'Semua Akun' },
            { key: 'siswa', label: 'Siswa' },
            { key: 'guru_bk', label: 'Guru BK' },
            { key: 'superadmin', label: 'Superadmin' },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setSelectedRoleFilter(tab.key)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedRoleFilter === tab.key
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-slate-200 text-[#0f172a] font-bold">
                <th className="px-6 py-4">Nama & Akun Pengguna</th>
                <th className="px-6 py-4">ID Pengguna</th>
                <th className="px-6 py-4 text-center">Role Saat Ini</th>
                <th className="px-6 py-4 text-center">Tanggal Pendaftaran</th>
                <th className="px-6 py-4 text-center">Ubah Hak Akses (Role)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => {
                  const isLoading = loadingUserId === user.id
                  const isCurrentAdmin = user.id === currentAdminId

                  return (
                    <tr key={user.id} className="hover:bg-[#f8fafc]/80 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-xs text-[#0f172a] border border-slate-200 shrink-0">
                            {user.full_name?.charAt(0) || 'U'}
                          </div>
                          <div>
                            <div className="font-extrabold text-[#0f172a] flex items-center gap-1.5">
                              <span>{user.full_name || 'Tanpa Nama'}</span>
                              {isCurrentAdmin && (
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-bold">
                                  Akun Anda
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-[#475569]">
                              Role: {user.role}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="font-mono text-[11px] text-slate-500 bg-slate-50 px-2 py-1 rounded-md border border-slate-200">
                          {user.id.slice(0, 8)}...{user.id.slice(-4)}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold border ${
                            user.role === 'superadmin'
                              ? 'bg-amber-100 text-amber-900 border-amber-300'
                              : user.role === 'guru_bk'
                              ? 'bg-emerald-100 text-[#065f46] border-emerald-300'
                              : 'bg-slate-100 text-slate-700 border-slate-300'
                          }`}
                        >
                          {user.role === 'superadmin' && <Shield className="w-3.5 h-3.5 text-amber-600" />}
                          {user.role === 'guru_bk' && <GraduationCap className="w-3.5 h-3.5 text-[#057a44]" />}
                          {user.role === 'siswa' && <Users className="w-3.5 h-3.5 text-slate-500" />}
                          <span className="capitalize">
                            {user.role === 'guru_bk' ? 'Guru BK' : user.role}
                          </span>
                        </span>
                      </td>

                      <td className="px-6 py-4 text-center text-[#475569] font-medium text-xs">
                        {new Date(user.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>

                      <td className="px-6 py-4 text-center">
                        <div className="inline-flex items-center gap-1.5">
                          <select
                            value={user.role}
                            disabled={isLoading}
                            onChange={(e) =>
                              handleRoleChange(
                                user.id,
                                e.target.value as 'siswa' | 'guru_bk' | 'superadmin'
                              )
                            }
                            className="px-3 py-1.5 bg-[#f8fafc] border border-slate-200 rounded-xl text-xs font-bold text-[#0f172a] outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer disabled:opacity-50"
                          >
                            <option value="siswa">Siswa</option>
                            <option value="guru_bk">Guru BK</option>
                            <option value="superadmin">Superadmin</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-xs text-slate-500">
                    Tidak ditemukan pengguna yang sesuai pencarian.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
