import React from 'react';
import { Calendar, Tag, FileText, ArrowRight } from 'lucide-react';
import type { PostData } from '../utils/markdown';
import './PostList.css';

interface PostListProps {
  onPostClick: (post: PostData) => void;
  posts: PostData[];
  loading: boolean;
}

const PostList: React.FC<PostListProps> = ({ onPostClick, posts, loading }) => {
  if (loading) {
    return <div className="loading-state card">加载文章中…</div>;
  }

  if (posts.length === 0) {
    return (
      <div className="empty-state card">
        没有找到匹配的文章
      </div>
    );
  }

  return (
    <div className="post-feed">
      <header className="feed-header">
        <h2 className="feed-title">最新文章</h2>
        <span className="feed-count">{posts.length} 篇</span>
      </header>

      <div className="post-list">
        {posts.map((post, index) => (
          <article
            key={post.id}
            className="post-card card"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="post-card-inner">
              <div className="post-card-head">
                {post.isPinned && <span className="post-pin">置顶</span>}
                <h3 className="post-title">
                  <button type="button" onClick={() => onPostClick(post)}>
                    {post.title}
                  </button>
                </h3>
              </div>

              <div className="meta-row post-meta">
                <span className="meta-item">
                  <Calendar size={14} />
                  {post.date}
                </span>
                <span className="meta-item">
                  <FileText size={14} />
                  {post.wordCount} 字
                </span>
              </div>

              <p className="post-excerpt">{post.excerpt}</p>

              <footer className="post-card-foot">
                <div className="post-tags">
                  {post.tags.map((tag) => (
                    <span key={tag} className="tag-pill">
                      <Tag size={11} />
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  className="post-read-btn"
                  onClick={() => onPostClick(post)}
                  aria-label={`阅读 ${post.title}`}
                >
                  阅读
                  <ArrowRight size={16} />
                </button>
              </footer>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default PostList;
