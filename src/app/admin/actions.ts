'use server'

import { revalidatePath } from 'next/cache'
import {
  updateUserRoleByAdmin,
  deleteUserProfileByAdmin,
  registerGuruBkByAdmin,
} from '@/services/admin.service'
import { updateSessionMaterial } from '@/services/cms.service'
import type { UserRole } from '@/types/auth'

export async function updateUserRole(userId: string, newRole: UserRole) {
  await updateUserRoleByAdmin(userId, newRole)
  revalidatePath('/admin')
  revalidatePath('/admin/users')
  revalidatePath('/guru/dashboard')
  return { success: true }
}

export async function updateCmsSession(
  sessionNumber: number,
  payload: { title: string; videoUrl?: string; description?: string }
) {
  await updateSessionMaterial(sessionNumber, payload)
  revalidatePath('/admin/materi')
  revalidatePath('/siswa')
  revalidatePath('/siswa/worksheet')
  return { success: true }
}

export async function deleteUserProfile(userId: string) {
  await deleteUserProfileByAdmin(userId)
  revalidatePath('/admin/users')
  return { success: true }
}

export async function registerGuruBk(payload: {
  fullName: string
  email: string
  password: string
}) {
  const result = await registerGuruBkByAdmin(payload)
  revalidatePath('/admin/users')
  return result
}
