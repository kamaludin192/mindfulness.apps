import React from "react";
import { createClient } from "@/lib/supabase/server";
import { StudentTable } from "@/components/guru/StudentTable";

export default async function GuruDashboardMonitoring() {
  const supabase = createClient();
  
  const { data: user, error: authError } = await supabase.auth.getUser();
  if (authError || !user?.user) {
    return <div>Silakan login sebagai Guru BK.</div>;
  }

  const { data: studentsWithProgress, error } = await supabase
    .from('profiles')
    .select(`
      id,
      full_name,
      created_at,
      exercise_progress(
        id,
        session_id,
        status,
        points_earned
      )
    `)
    .eq('role', 'siswa')
    .order('full_name', { ascending: true });

  if (error) {
     throw new Error(`Error fetching students progress: ${error.message}`);
  }

  return (
     <div className="max-w-7xl mx-auto space-y-6">
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
           <h1 className="text-2xl font-bold text-brand-900">Monitoring Siswa</h1>
           <p className="text-brand-700">Pantau progress pengerjaan LKS siswa</p>
         </div>
       </div>

       <div className="bg-surface rounded-2xl shadow-sm border border-brand-300 overflow-hidden">
         <StudentTable students={studentsWithProgress as unknown as Parameters<typeof StudentTable>[0]["students"]} />
       </div>
     </div>
  );
}
