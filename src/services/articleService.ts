import { supabase } from '../utils/supabase'
import type { PostData } from '../utils/markdown'

export interface ArticleRow {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  category: string
  tags: string[] | null
  cover_url: string | null
  views: number
  published_at: string | null
  created_at: string
}

const LIST_SELECT = 'id,slug,title,excerpt,category,tags,cover_url,views,published_at,created_at'
const DETAIL_SELECT = 'id,slug,title,excerpt,content,author,category,tags,cover_url,views,published_at,created_at'

function mapRow(row: ArticleRow): PostData {
  const date = row.published_at
    ? row.published_at.split('T')[0]
    : row.created_at
      ? row.created_at.split('T')[0]
      : ''

  return {
    id: String(row.id),
    slug: row.slug,
    title: row.title,
    date,
    cover: row.cover_url || '',
    category: row.category || '',
    tags: row.tags?.length ? row.tags : row.category ? [row.category] : [],
    excerpt: row.excerpt || '',
    views: row.views ?? 0,
    content: row.content || '',
    wordCount: row.content ? row.content.trim().split(/\s+/).length : 0,
  }
}

/** Fetch paginated articles (list fields only, no full content) */
export async function fetchArticles(page: number, pageSize: number = 10) {
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  const { data, error } = await supabase
    .from('articles')
    .select(LIST_SELECT, { count: 'exact' })
    .eq('published', true)
    .order('published_at', { ascending: false, nullsFirst: false })
    .range(from, to)

  if (error) {
    console.error('Supabase fetch articles:', error)
    return { articles: [] as PostData[], total: 0 }
  }

  return {
    articles: (data || []).map((d) => mapRow(d as unknown as ArticleRow)),
    total: 0, // count is not reliable with range in supabase-js v2
  }
}

/** Fetch total published count */
export async function fetchArticlesCount() {
  const { count, error } = await supabase
    .from('articles')
    .select('*', { count: 'exact', head: true })
    .eq('published', true)

  if (error) {
    console.error('Supabase count error:', error)
    return 0
  }
  return count ?? 0
}

/** Fetch a single article by id (with full content) */
export async function fetchArticleById(id: string) {
  const { data, error } = await supabase
    .from('articles')
    .select(DETAIL_SELECT)
    .eq('id', id)
    .eq('published', true)
    .maybeSingle()

  if (error || !data) return null

  const article = mapRow(data as unknown as ArticleRow)

  // Increment view count (fire-and-forget)
  supabase.rpc('increment_article_views', { article_id: Number(id) }).then(() => {})

  return article
}

/** Search articles by title */
export async function searchArticles(keyword: string, limit = 20) {
  if (!keyword.trim()) return []

  const { data, error } = await supabase
    .from('articles')
    .select(LIST_SELECT)
    .eq('published', true)
    .ilike('title', `%${keyword.trim()}%`)
    .order('published_at', { ascending: false, nullsFirst: false })
    .limit(limit)

  if (error) {
    console.error('Supabase search error:', error)
    return []
  }

  return (data || []).map((d) => mapRow(d as unknown as ArticleRow))
}
