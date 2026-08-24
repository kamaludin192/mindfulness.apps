'use client'

import { useState } from 'react'
import {
  Users,
  Search,
  CheckCircle2,
  Shield,
  GraduationCap,
  AlertCircle,
  UserPlus,
  X,
  Mail,
  Lock,
  User,
  Loader2,
} from 'lucide-react'
import { updateUserRole, registerGuruBk } from '@/app/admin/actions'
import type { UserProfile } from '@/types/auth'

export type { UserProfile }

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

  // Modal State for Registering Guru BK
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [guruFullName, setGuruFullName] = useState('')
  const [guruEmail, setGuruEmail] = useState('')
  const [guruPassword, setGuruPassword] = useState('')
  const [guruConfirmPassword, setGuruConfirmPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [modalError, setModalError] = useState<string | null>(null)

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

  // Handle Register Guru BK Submit
  const handleRegisterGuruSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setModalError(null)

    if (!guruFullName.trim() || !guruEmail.trim() || !guruPassword) {
      setModalError('Semua kolom wajib diisi!')
      return
    }

    if (guruPassword.length < 6) {
      setModalError('Password minimal harus 6 karakter.')
      return
    }

    if (guruPassword !== guruConfirmPassword) {
      setModalError('Konfirmasi password tidak cocok!')
      return
    }

    setIsSubmitting(true)

    try {
      const res = await registerGuruBk({
        fullName: guruFullName.trim(),
        email: guruEmail.trim(),
        password: guruPassword,
      })

      if (res.user) {
        setUsers([res.user, ...users])
      }

      setSuccessMsg(
        `Berhasil mendaftarkan Guru BK baru: "${guruFullName.trim()}" (${guruEmail.trim()}). Akun siap digunakan untuk login!`
      )
      setIsModalOpen(false)
      setGuruFullName('')
      setGuruEmail('')
      setGuruPassword('')
      setGuruConfirmPassword('')
      setTimeout(() => setSuccessMsg(null), 6000)
    } catch (err) {
      console.error(err)
      setModalError(err instanceof Error ? err.message : 'Gagal mendaftarkan Guru BK.')
    } finally {
      setIsSubmitting(false)
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

      {/* Top Header & Actions */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border-2 border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nama atau user ID..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#f8fafc] border border-slate-200 rounded-2xl text-xs sm:text-sm text-[#0f172a] placeholder-slate-400 outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white font-medium"
          />
        </div>

        {/* Action Buttons & Filters */}
        <div className="flex flex-wrap items-center justify-between md:justify-end gap-3 w-full md:w-auto">
          {/* Role Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
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
                className={`px-3 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  selectedRoleFilter === tab.key
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Add Guru BK Button */}
          <button
            type="button"
            onClick={() => {
              setModalError(null)
              setIsModalOpen(true)
            }}
            className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs sm:text-sm font-extrabold rounded-2xl shadow-md flex items-center gap-2 transition-all cursor-pointer active:scale-95 shrink-0"
          >
            <UserPlus className="w-4 h-4" />
            <span>+ Daftarkan Guru BK Baru</span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-slate-200 text-[#0f172a] font-extrabold">
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
                          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-black text-sm text-[#0f172a] border border-slate-200 shrink-0">
                            {user.full_name?.charAt(0) || 'U'}
                          </div>
                          <div>
                            <div className="font-black text-[#0f172a] flex items-center gap-1.5">
                              <span>{user.full_name || 'Tanpa Nama'}</span>
                              {isCurrentAdmin && (
                                <span className="text-[10px] bg-amber-100 text-amber-900 border border-amber-300 font-extrabold px-1.5 py-0.5 rounded-md">
                                  Anda
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-500 font-medium">
                              {user.role === 'guru_bk'
                                ? 'Pendidik / Konselor BK'
                                : user.role === 'superadmin'
                                ? 'Pengelola Sistem Utama'
                                : 'Peserta Intervensi'}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="font-mono text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded-lg border border-slate-200">
                          {user.id.substring(0, 13)}...
                        </span>
                      </td>

                      <td className="px-6 py-4 text-center">
                        {user.role === 'superadmin' && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-900 rounded-full text-xs font-black">
                            <Shield className="w-3.5 h-3.5 text-amber-600" />
                            Superadmin
                          </span>
                        )}
                        {user.role === 'guru_bk' && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-full text-xs font-black">
                            <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                            Guru BK
                          </span>
                        )}
                        {user.role === 'siswa' && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-200 text-blue-900 rounded-full text-xs font-black">
                            <Users className="w-3.5 h-3.5 text-blue-600" />
                            Siswa
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-center text-slate-600 font-semibold text-xs">
                        {user.created_at
                          ? new Date(user.created_at).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })
                          : '-'}
                      </td>

                      <td className="px-6 py-4 text-center">
                        <div className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200">
                          {(['siswa', 'guru_bk', 'superadmin'] as const).map((r) => {
                            const isCurrent = user.role === r
                            return (
                              <button
                                key={r}
                                type="button"
                                disabled={isLoading || isCurrent}
                                onClick={() => handleRoleChange(user.id, r)}
                                className={`px-2.5 py-1 rounded-lg text-xs font-extrabold transition-all cursor-pointer disabled:cursor-not-allowed ${
                                  isCurrent
                                    ? 'bg-white text-[#0f172a] shadow-xs'
                                    : 'text-slate-500 hover:text-[#0f172a] hover:bg-slate-200/60'
                                }`}
                              >
                                {r === 'siswa' ? 'Siswa' : r === 'guru_bk' ? 'Guru BK' : 'Admin'}
                              </button>
                            )
                          })}
                        </div>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400 font-bold">
                    Tidak ditemukan data pengguna yang cocok.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MODAL DAFTARKAN GURU BK BARU */}
      {/* ========================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl border-2 border-slate-200 shadow-2xl overflow-hidden p-6 sm:p-7 relative space-y-5 animate-in zoom-in-95">
            {/* Header Modal */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-[#0f172a]">
                    Daftarkan Guru BK Baru
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Buat akun resmi untuk pendidik / konselor BK
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Error in modal */}
            {modalError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-xl text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{modalError}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleRegisterGuruSubmit} className="space-y-4">
              {/* Nama Lengkap */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0f172a] block">
                  Nama Lengkap Guru BK <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={guruFullName}
                    onChange={(e) => setGuruFullName(e.target.value)}
                    placeholder="Contoh: Dra. Siti Rahmawati, M.Pd"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#f8fafc] border border-slate-200 rounded-2xl text-xs sm:text-sm text-[#0f172a] font-medium outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Email Guru */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0f172a] block">
                  Email Akun Guru BK <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={guruEmail}
                    onChange={(e) => setGuruEmail(e.target.value)}
                    placeholder="nama.guru@sekolah.sch.id"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#f8fafc] border border-slate-200 rounded-2xl text-xs sm:text-sm text-[#0f172a] font-medium outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0f172a] block">
                  Kata Sandi (Password) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={guruPassword}
                    onChange={(e) => setGuruPassword(e.target.value)}
                    placeholder="Minimal 6 karakter"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#f8fafc] border border-slate-200 rounded-2xl text-xs sm:text-sm text-[#0f172a] font-medium outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Konfirmasi Password */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0f172a] block">
                  Konfirmasi Kata Sandi <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={guruConfirmPassword}
                    onChange={(e) => setGuruConfirmPassword(e.target.value)}
                    placeholder="Ketik ulang kata sandi"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#f8fafc] border border-slate-200 rounded-2xl text-xs sm:text-sm text-[#0f172a] font-medium outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Info Note */}
              <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-2xl text-[11px] text-[#065f46] font-medium">
                💡 Akun yang didaftarkan akan otomatis memiliki hak akses <strong>Guru BK</strong> (bisa memonitor LKS siswa, kelola jadwal konseling, & chatting dengan siswa).
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-2xl border border-slate-200 text-slate-600 text-xs font-extrabold hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white rounded-2xl text-xs sm:text-sm font-black shadow-md flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Mendaftarkan...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Simpan & Daftarkan Guru BK</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
