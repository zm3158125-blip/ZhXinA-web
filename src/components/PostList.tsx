import React from 'react';
import { Calendar, Tag, ArrowRight, Loader2 } from 'lucide-react';
import type { PostData } from '../utils/markdown';
import './PostList.css';

interface PostListProps {
  onPostClick: (post: PostData) => void;
  posts: PostData[];
  loading: boolean;
  loadingMore?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
}

const SkeletonCard: React.FC = () => (
  <article className="post-card card skeleton-card">
    <div className="post-card-inner">
      <div className="skeleton-line s-h3" />
      <div className="skeleton-line s-meta" />
      <div className="skeleton-line s-excerpt" />
      <div className="skeleton-line s-excerpt short" />
      <div className="skeleton-line s-excerpt shorter" />
      <div className="skeleton-card-foot">
        <div className="skeleton-line s-tag" />
        <div className="skeleton-line s-tag" />
        <div className="skeleton-line s-btn" />
      </div>
    </div>
  </article>
);

const PostCard: React.FC<{ post: PostData; index: number; onPostClick: (post: PostData) => void }> = ({
  post,
  index,
  onPostClick,
}) => (
  <article
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
);

const PostList: React.FC<PostListProps> = ({
  onPostClick,
  posts,
  loading,
  loadingMore = false,
  hasMore = false,
  onLoadMore,
}) => {
  if (loading) {
    return (
      <div className="post-feed">
        <header className="feed-header">
          <h2 className="feed-title">最新文章</h2>
        </header>
        <div className="post-list">
          {[1, 2, 3].map((n) => (
            <SkeletonCard key={n} />
          ))}
        </div>
      </div>
    );
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
          <PostCard key={post.id} post={post} index={index} onPostClick={onPostClick} />
        ))}
      </div>

      {hasMore && (
        <div className="load-more-wrap">
          <button
            type="button"
            className="load-more-btn"
            onClick={onLoadMore}
            disabled={loadingMore}
          >
            {loadingMore ? (
              <>
                <Loader2 size={16} className="spin" />
                加载中…
              </>
            ) : (
              '加载更多'
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default PostList;
