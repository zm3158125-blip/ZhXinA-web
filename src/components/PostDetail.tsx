import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import type { PostData } from '../utils/markdown';
import { fetchArticleById } from '../services/articleService';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import './PostDetail.css';

interface PostDetailProps {
  post: PostData;
  onBack: () => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ post, onBack }) => {
  const [fullPost, setFullPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If content is already included (e.g., from cache or direct fetch), use it
    if (post.content) {
      setFullPost(post);
      setLoading(false);
      return;
    }

    // Otherwise fetch full article from Supabase
    let cancelled = false;
    setLoading(true);

    fetchArticleById(post.id)
      .then((data) => {
        if (!cancelled) setFullPost(data);
      })
      .catch((e) => {
        console.error('Failed to fetch article:', e);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [post.id, post.content]);

  const article = fullPost || post;

  if (loading) {
    return (
      <article className="post-detail card page-shell">
        <button type="button" onClick={onBack} className="back-btn">
          <ArrowLeft size={18} />
          返回列表
        </button>
        <div className="detail-skeleton">
          <div className="skeleton-block s-title" />
          <div className="skeleton-block s-meta-line" />
          <div className="skeleton-block s-content" />
          <div className="skeleton-block s-content short" />
          <div className="skeleton-block s-content" />
          <div className="skeleton-block s-content short" />
        </div>
      </article>
    );
  }

  return (
    <article className="post-detail card page-shell">
      <button type="button" onClick={onBack} className="back-btn">
        <ArrowLeft size={18} />
        返回列表
      </button>

      <header className="post-detail-header">
        <h1 className="post-detail-title">{article.title}</h1>
        <div className="meta-row">
          <span className="meta-item">
            <Calendar size={16} />
            {article.date}
          </span>
          {article.tags.map((tag) => (
            <span key={tag} className="tag-pill">
              <Tag size={12} />
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div className="markdown-body">
        <ReactMarkdown>{article.content || ''}</ReactMarkdown>
      </div>
    </article>
  );
};

export default PostDetail;
