"use client";

import React, { useState } from "react";
import { Check, X, Clock, Calendar } from "lucide-react";
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

  const handleUpdate = async (id: string, status: 'approved' | 'rejected') => {
    try {
      setLoadingId(id);
      await updateCounselingStatus(id, status);
    } catch (error) {
      console.error(error);
      alert("Failed to update status");
    } finally {
      setLoadingId(null);
    }
  };

  if (!bookings || bookings.length === 0) {
    return (
      <div className="p-8 text-center text-brand-700">
        Belum ada permintaan konseling.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-brand-50 border-b border-brand-300">
            <th className="px-6 py-4 font-semibold text-brand-900">Nama Siswa</th>
            <th className="px-6 py-4 font-semibold text-brand-900">Jadwal</th>
            <th className="px-6 py-4 font-semibold text-brand-900">Status</th>
            <th className="px-6 py-4 font-semibold text-brand-900 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-brand-100">
          {bookings.map((booking) => {
            const isLoading = loadingId === booking.id;
            return (
              <tr key={booking.id} className="hover:bg-brand-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-brand-900">
                    {booking.student_profile?.full_name || "Siswa Tidak Dikenal"}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-brand-700">
                    <Calendar className="w-4 h-4 text-brand-500" />
                    <span>{new Date(booking.scheduled_at).toLocaleDateString('id-ID')}</span>
                    <Clock className="w-4 h-4 text-brand-500 ml-2" />
                    <span>{new Date(booking.scheduled_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm font-medium border
                    ${booking.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : ''}
                    ${booking.status === 'approved' ? 'bg-green-50 text-green-700 border-green-200' : ''}
                    ${booking.status === 'rejected' ? 'bg-red-50 text-red-700 border-red-200' : ''}
                  `}>
                    {booking.status === 'pending' && 'Menunggu'}
                    {booking.status === 'approved' && 'Disetujui'}
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
                          className="p-2 bg-green-50 text-green-600 rounded-lg border border-green-200 hover:bg-green-100 disabled:opacity-50 transition-colors"
                          title="Terima"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleUpdate(booking.id, 'rejected')}
                          disabled={isLoading}
                          className="p-2 bg-red-50 text-red-600 rounded-lg border border-red-200 hover:bg-red-100 disabled:opacity-50 transition-colors"
                          title="Tolak"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <span className="text-sm text-brand-500 italic">Selesai</span>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
