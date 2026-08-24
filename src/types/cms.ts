export type {
  LandingPageConfig,
  ProgramPageConfig,
  TentangKamiPageConfig,
  AppLayoutConfig,
} from '@/lib/layout-cms-config'

export interface CmsContentItem {
  id?: string
  session_number: number
  title: string
  description: string
  video_url?: string | null
  worksheet_structure?: Record<string, unknown> | null
  created_at?: string
  updated_at?: string
}
