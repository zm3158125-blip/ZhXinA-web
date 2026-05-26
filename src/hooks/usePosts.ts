import { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import type { PostData } from '../utils/markdown';
import { fetchArticles, fetchArticlesCount } from '../services/articleService';

const CACHE_KEY = 'zhxin_posts_cache';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const PAGE_SIZE = 10;

interface CacheData {
  articles: PostData[];
  total: number;
  timestamp: number;
}

function loadCache(): CacheData | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cached = JSON.parse(raw) as CacheData;
    if (Date.now() - cached.timestamp > CACHE_TTL) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
    return cached;
  } catch {
    return null;
  }
}

function saveCache(articles: PostData[], total: number) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ articles, total, timestamp: Date.now() }));
  } catch {
    // localStorage full or unavailable — ignore
  }
}

export function usePosts(searchQuery: string) {
  const [allPosts, setAllPosts] = useState<PostData[]>(() => {
    const cached = loadCache();
    return cached?.articles ?? [];
  });
  const [total, setTotal] = useState(() => loadCache()?.total ?? 0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const currentPage = useRef(Math.ceil(allPosts.length / PAGE_SIZE) || 1);
  const allLoaded = useRef(false);
  const initialFetchDone = useRef(false);

  // On first mount, fetch page 1 (or from cache)
  useEffect(() => {
    if (initialFetchDone.current) return;
    initialFetchDone.current = true;

    const cached = loadCache();
    if (cached) {
      setAllPosts(cached.articles);
      setTotal(cached.total);
      currentPage.current = Math.ceil(cached.articles.length / PAGE_SIZE) || 1;
      setLoading(false);
      // Background refresh if cache exists
      if (cached.articles.length > 0) {
        refreshInBackground();
        return;
      }
    }

    loadInitialPage();
  }, []);

  async function loadInitialPage() {
    setLoading(true);
    try {
      const [{ articles }, count] = await Promise.all([
        fetchArticles(1, PAGE_SIZE),
        fetchArticlesCount(),
      ]);
      setAllPosts(articles);
      setTotal(count);
      currentPage.current = 1;
      allLoaded.current = articles.length >= count;
      saveCache(articles, count);
    } catch (e) {
      console.error('Failed to load posts:', e);
    } finally {
      setLoading(false);
    }
  }

  async function refreshInBackground() {
    try {
      const [{ articles }, count] = await Promise.all([
        fetchArticles(1, PAGE_SIZE),
        fetchArticlesCount(),
      ]);
      setAllPosts(articles);
      setTotal(count);
      currentPage.current = 1;
      allLoaded.current = articles.length >= count;
      saveCache(articles, count);
    } catch {
      // Silent failure — stale cache is fine
    }
  }

  const loadMore = useCallback(async () => {
    if (loadingMore || allLoaded.current) return;
    setLoadingMore(true);
    try {
      const nextPage = currentPage.current + 1;
      const { articles } = await fetchArticles(nextPage, PAGE_SIZE);
      if (articles.length === 0) {
        allLoaded.current = true;
      } else {
        setAllPosts((prev) => {
          const merged = [...prev, ...articles];
          saveCache(merged, total);
          return merged;
        });
        currentPage.current = nextPage;
      }
    } catch (e) {
      console.error('Failed to load more posts:', e);
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, total]);

  // Reset search results when query changes
  const searchResults = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return undefined;
    return allPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }, [allPosts, searchQuery]);

  const hasMore = !allLoaded.current && allPosts.length < total;

  return {
    posts: allPosts,
    filteredPosts: searchResults ?? allPosts,
    loading,
    loadingMore,
    hasMore,
    total,
    isSearching: !!searchQuery.trim(),
    loadMore,
  };
}
