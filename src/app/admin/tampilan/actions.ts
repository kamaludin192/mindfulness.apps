'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { DEFAULT_LAYOUT_CONFIG, type AppLayoutConfig } from '@/lib/layout-cms-config'

async function ensureSuperadmin() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Autentikasi diperlukan.')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'superadmin') {
    throw new Error('Akses ditolak: Hanya Superadmin yang memiliki wewenang ini.')
  }

  return { supabase, user }
}

export async function getLayoutConfigAction(): Promise<AppLayoutConfig> {
  const supabase = createClient()

  try {
    const { data, error } = await supabase
      .from('cms_contents')
      .select('description')
      .eq('title', '__APP_LAYOUT_CONFIG__')
      .single()

    if (!error && data?.description) {
      const parsed = JSON.parse(data.description)
      return {
        landingPage: { ...DEFAULT_LAYOUT_CONFIG.landingPage, ...parsed.landingPage },
        programPage: { ...DEFAULT_LAYOUT_CONFIG.programPage, ...parsed.programPage },
        tentangKamiPage: { ...DEFAULT_LAYOUT_CONFIG.tentangKamiPage, ...parsed.tentangKamiPage },
      }
    }
  } catch (e) {
    console.warn('Fallback to default layout config:', e)
  }

  return DEFAULT_LAYOUT_CONFIG
}

export async function saveLayoutConfigAction(newConfig: AppLayoutConfig) {
  const { supabase } = await ensureSuperadmin()

  try {
    const configString = JSON.stringify(newConfig)

    // Check if configuration record exists
    const { data: existing } = await supabase
      .from('cms_contents')
      .select('id')
      .eq('title', '__APP_LAYOUT_CONFIG__')
      .single()

    if (existing?.id) {
      const { error } = await supabase
        .from('cms_contents')
        .update({
          description: configString,
        })
        .eq('id', existing.id)

      if (error) throw error
    } else {
      const { error } = await supabase.from('cms_contents').insert({
        session_number: 999,
        title: '__APP_LAYOUT_CONFIG__',
        description: configString,
      })

      if (error) throw error
    }
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err)
    console.warn('Warning saving layout config to Supabase:', errorMsg)
  }

  revalidatePath('/')
  revalidatePath('/program')
  revalidatePath('/tentang-kami')
  revalidatePath('/siswa')
  revalidatePath('/guru')
  revalidatePath('/admin/tampilan')

  return { success: true }
}

export async function resetLayoutConfigAction() {
  await ensureSuperadmin()
  await saveLayoutConfigAction(DEFAULT_LAYOUT_CONFIG)
  return { success: true }
}
