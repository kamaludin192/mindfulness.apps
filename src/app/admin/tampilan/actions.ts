'use server'

import { revalidatePath } from 'next/cache'
import type { AppLayoutConfig } from '@/lib/layout-cms-config'
import {
  getLayoutConfig,
  saveLayoutConfig,
  resetLayoutConfig,
} from '@/services/cms.service'

export async function getLayoutConfigAction(): Promise<AppLayoutConfig> {
  return await getLayoutConfig()
}

export async function saveLayoutConfigAction(config: AppLayoutConfig): Promise<void> {
  await saveLayoutConfig(config)
  revalidatePath('/')
  revalidatePath('/program')
  revalidatePath('/tentang-kami')
  revalidatePath('/admin/tampilan')
}

export async function resetLayoutConfigAction(): Promise<void> {
  await resetLayoutConfig()
  revalidatePath('/')
  revalidatePath('/program')
  revalidatePath('/tentang-kami')
  revalidatePath('/admin/tampilan')
}
