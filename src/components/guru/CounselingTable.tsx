"use client";

import React, { useState } from "react";
import { Check, X, Clock, Calendar, MessageSquareQuote } from "lucide-react";
import { updateCounselingStatus } from "@/app/guru/counseling/actions";

type Booking = {
  id: string;
  student_id: string;
  guru_id: string;
  scheduled_at: string;
  status: 'pending' | 'approved' | 'rejected';
  student_profile?: {
    full_name: string;
  };
};

export function CounselingTable({ bookings }: { bookings: Booking[] }) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleUpdate = async (id: string, status: 'approved' | 'rejected') => {
    try {
      setLoadingId(id);
      setErrorMsg(null);
      await updateCounselingStatus(id, status);
    } catch (error) {
      console.error(error);
      setErrorMsg("Gagal mengubah status. Silakan coba lagi.");
    } finally {
      setLoadingId(null);
    }
  };

  if (!bookings || bookings.length === 0) {
    return (
      <div className="p-12 text-center text-[#475569] space-y-2">
        <MessageSquareQuote className="w-8 h-8 mx-auto text-[#057a44]/50" />
        <p className="font-bold text-sm text-[#0f172a]">Belum Ada Permintaan Konseling</p>
        <p className="text-xs">Permintaan jadwal temu atau konseling dari siswa akan masuk di sini.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {errorMsg && (
        <div className="p-4 text-xs font-bold text-red-800 bg-red-50 border border-red-200 rounded-2xl mx-4 mt-4">
          {errorMsg}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-[#f8fafc] border-b border-[#e2e8f0] text-[#0f172a] font-bold">
              <th className="px-6 py-4">Nama Siswa</th>
              <th className="px-6 py-4">Waktu & Jadwal Sesi</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-center">Tindakan / Respon</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {bookings.map((booking) => {
              const isLoading = loadingId === booking.id;
              return (
                <tr key={booking.id} className="hover:bg-[#f8fafc]/80 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-extrabold text-[#0f172a]">
                      {booking.student_profile?.full_name || "Siswa"}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-[#334155] font-medium">
                      <Calendar className="w-4 h-4 text-[#057a44]" />
                      <span>{new Date(booking.scheduled_at).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      <Clock className="w-4 h-4 text-[#057a44] ml-2" />
                      <span className="font-bold">{new Date(booking.scheduled_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold border ${
                      booking.status === 'pending'
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : booking.status === 'approved'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-red-50 text-red-800 border-red-200'
                    }`}>
                      {booking.status === 'pending' && 'Menunggu Respon'}
                      {booking.status === 'approved' && 'Telah Disetujui'}
                      {booking.status === 'rejected' && 'Ditolak'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      {booking.status === 'pending' ? (
                        <>
                          <button
                            onClick={() => handleUpdate(booking.id, 'approved')}
                            disabled={isLoading}
                            className="inline-flex items-center gap-1 px-3.5 py-1.5 bg-[#057a44] text-white rounded-xl font-bold text-xs hover:bg-[#046238] disabled:opacity-50 transition-all cursor-pointer shadow-xs"
                            title="Setujui Jadwal"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Setujui</span>
                          </button>
                          <button
                            onClick={() => handleUpdate(booking.id, 'rejected')}
                            disabled={isLoading}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-white text-red-600 rounded-xl font-bold text-xs border border-red-200 hover:bg-red-50 disabled:opacity-50 transition-all cursor-pointer"
                            title="Tolak Jadwal"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>Tolak</span>
                          </button>
                        </>
                      ) : (
                        <span className="text-xs font-semibold text-[#64748b]">
                          {booking.status === 'approved' ? 'Jadwal Aktif' : 'Dibatalkan'}
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
