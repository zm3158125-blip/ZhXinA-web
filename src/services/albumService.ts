import { supabase } from '../utils/supabase'

export interface AlbumImage {
  id: string
  url: string
  title: string
}

const LIST_SELECT = 'id, url, title, sort_order'

export async function fetchAlbumImagesPage(page: number, pageSize = 5) {
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  const [listResult, countResult] = await Promise.all([
    supabase
      .from('album_images')
      .select(LIST_SELECT)
      .order('sort_order', { ascending: true })
      .range(from, to),
    supabase
      .from('album_images')
      .select('*', { count: 'exact', head: true }),
  ])

  if (listResult.error) {
    console.error('Supabase fetch album page:', listResult.error)
    return { images: [] as AlbumImage[], total: 0 }
  }

  const total = countResult.count ?? 0

  return {
    images: (listResult.data || []).map((img: Record<string, unknown>) => ({
      id: String(img.id),
      url: String(img.url || ''),
      title: String(img.title || ''),
    })),
    total,
  }
}
