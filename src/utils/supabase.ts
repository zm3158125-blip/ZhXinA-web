import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

function buildClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    if (typeof window !== 'undefined') {
      console.warn('[Supabase] 未配置，请设置 VITE_SUPABASE_URL 和 VITE_SUPABASE_ANON_KEY')
    }
    return null
  }
  try {
    return createClient(supabaseUrl, supabaseAnonKey)
  } catch (e) {
    console.warn('[Supabase] 初始化失败:', e)
    return null
  }
}

const client = buildClient()

/**
 * 安全的 Supabase 代理 —— 当 client 为 null 时，
 * 所有 .from() / .rpc() 调用返回空结果而非抛错。
 */
export const supabase = new Proxy(
  {},
  {
    get(_, prop) {
      if (!client) {
        // 返回一个空操作代理
        const noop = new Proxy(
          {},
          {
            get(_, p) {
              if (p === 'then' || p === 'catch' || p === 'finally') return undefined
              return noop
            },
          }
        )
        if (prop === 'from') return () => noop
        if (prop === 'rpc') return () => noop
        return noop
      }
      const val = (client as any)[prop]
      return typeof val === 'function' ? val.bind(client) : val
    },
  }
) as ReturnType<typeof createClient>
