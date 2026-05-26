import { supabase } from '../utils/supabase'

export interface ToolItem {
  id: string
  name: string
  icon: string
  badgeType: string
  url: string
  description: string
}

export async function fetchTools(): Promise<ToolItem[]> {
  const { data, error } = await supabase
    .from('tools')
    .select('id, name, icon_url, badge_type, url, description, sort_order')
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Supabase fetch tools:', error)
    return []
  }

  return (data || []).map((tool: Record<string, unknown>) => ({
    id: String(tool.id),
    name: String(tool.name || ''),
    icon: String(tool.icon_url || ''),
    badgeType: String(tool.badge_type || 'blue'),
    url: String(tool.url || ''),
    description: String(tool.description || ''),
  }))
}
