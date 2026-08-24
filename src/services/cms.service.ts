import { createClient } from '@/lib/supabase/server'
import {
  DEFAULT_LAYOUT_CONFIG,
  type AppLayoutConfig,
} from '@/lib/layout-cms-config'

const LAYOUT_CMS_CONFIG_KEY = '__APP_LAYOUT_CONFIG__'
const LAYOUT_CMS_SESSION_NUMBER = 999

export async function getLayoutConfig(): Promise<AppLayoutConfig> {
  const supabase = createClient()
  try {
    const { data, error } = await supabase
      .from('cms_contents')
      .select('description')
      .eq('session_number', LAYOUT_CMS_SESSION_NUMBER)
      .eq('title', LAYOUT_CMS_CONFIG_KEY)
      .maybeSingle()

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

export async function saveLayoutConfig(config: AppLayoutConfig): Promise<void> {
  const supabase = createClient()
  const payloadJson = JSON.stringify(config)

  const { data: existing } = await supabase
    .from('cms_contents')
    .select('id')
    .eq('session_number', LAYOUT_CMS_SESSION_NUMBER)
    .eq('title', LAYOUT_CMS_CONFIG_KEY)
    .maybeSingle()

  if (existing?.id) {
    const { error } = await supabase
      .from('cms_contents')
      .update({
        description: payloadJson,
        updated_at: new Date().toISOString(),
      })
      .eq('id', existing.id)

    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabase.from('cms_contents').insert({
      session_number: LAYOUT_CMS_SESSION_NUMBER,
      title: LAYOUT_CMS_CONFIG_KEY,
      description: payloadJson,
      worksheet_structure: {},
    })

    if (error) throw new Error(error.message)
  }
}

export async function resetLayoutConfig(): Promise<void> {
  const supabase = createClient()
  await supabase
    .from('cms_contents')
    .delete()
    .eq('session_number', LAYOUT_CMS_SESSION_NUMBER)
    .eq('title', LAYOUT_CMS_CONFIG_KEY)
}

export async function getAllSessionMaterials() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('cms_contents')
    .select('*')
    .neq('session_number', LAYOUT_CMS_SESSION_NUMBER)
    .order('session_number', { ascending: true })

  if (error) {
    console.warn('Error fetching session materials:', error.message)
  }
  return data || []
}

export async function updateSessionMaterial(
  sessionNumber: number,
  payload: { title: string; videoUrl?: string; description?: string }
): Promise<void> {
  const supabase = createClient()
  const { data: existing } = await supabase
    .from('cms_contents')
    .select('id')
    .eq('session_number', sessionNumber)
    .single()

  if (existing?.id) {
    const { error } = await supabase
      .from('cms_contents')
      .update({
        title: payload.title,
        video_url: payload.videoUrl,
      })
      .eq('id', existing.id)

    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabase.from('cms_contents').insert({
      session_number: sessionNumber,
      title: payload.title,
      video_url: payload.videoUrl,
    })

    if (error) throw new Error(error.message)
  }
}
