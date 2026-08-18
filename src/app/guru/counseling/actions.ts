"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateCounselingStatus(bookingId: string, newStatus: 'approved' | 'rejected') {
  const supabase = createClient();
  
  // Verify that the user is a guru_bk
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    throw new Error("Unauthorized");
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userData.user.id)
    .single();

  if (profileError || profile?.role !== 'guru_bk') {
    throw new Error("Unauthorized: Only Guru BK can approve/reject counseling");
  }

  // Update status
  const { error: updateError } = await supabase
    .from('counseling_bookings')
    .update({ status: newStatus })
    .eq('id', bookingId)
    .eq('guru_id', userData.user.id);

  if (updateError) {
    throw new Error(`Failed to update booking: ${updateError.message}`);
  }

  revalidatePath("/guru/counseling");
}
