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
 * 安全代理 —— client 为 null 时所有调用返回空结果而非抛错。
 * 支持 .from().select().eq().order().range() 等链式调用。
 */
function createSafeSupabase() {
  if (client) return client

  // 可调用的 noop，支持链式 .anyProp() 和 await
  const noop = new Proxy(
    () => {},
    {
      get(_, p) {
        // 让 await / Promise 链认为这不是 thenable
        if (p === 'then' || p === 'catch' || p === 'finally') return undefined
        return noop
      },
      apply() {
        return noop
      },
    }
  )

  return new Proxy(
    {},
    {
      get(_, prop) {
        if (prop === 'from') return () => noop
        if (prop === 'rpc') return () => noop
        return noop
      },
    }
  ) as ReturnType<typeof createClient>
}

export const supabase = createSafeSupabase()
