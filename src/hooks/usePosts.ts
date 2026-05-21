import { useEffect, useMemo, useState } from 'react';
import { getAllPosts, type PostData } from '../utils/markdown';

export function usePosts(searchQuery: string) {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadPosts = async () => {
      try {
        const data = await getAllPosts();
        if (!cancelled) setPosts(data);
      } catch (error) {
        console.error('Failed to load posts', error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadPosts();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredPosts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return posts;
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }, [posts, searchQuery]);

  return { posts, filteredPosts, loading };
}
