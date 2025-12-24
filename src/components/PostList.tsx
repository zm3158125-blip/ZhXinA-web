import React from 'react';
import { Calendar, Tag, FileText, ChevronRight } from 'lucide-react';
import type { PostData } from '../utils/markdown';
import './PostList.css';

interface PostListProps {
    onPostClick: (post: PostData) => void;
    posts: PostData[];
    loading: boolean;
}

const PostList: React.FC<PostListProps> = ({ onPostClick, posts, loading }) => {
    if (loading) {
        return <div className="loading" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>Loading posts...</div>;
    }

    if (posts.length === 0) {
        return (
            <div className="glass-card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                No posts found matching your search.
            </div>
        );
    }

    return (
        <div className="post-list">
            {posts.map(post => (
                <article key={post.id} className="post-card glass-card">
                    <div className="post-content">
                        <h2 className="post-title">
                            {post.isPinned && <span className="pin-icon">📍</span>}
                            {post.title}
                        </h2>

                        <div className="post-meta">
                            <div className="meta-item">
                                <Calendar size={14} />
                                <span>{post.date}</span>
                            </div>
                            <div className="meta-item">
                                <FileText size={14} />
                                <span>{post.wordCount} words</span>
                            </div>
                        </div>

                        {/* Use ReactMarkdown for excerpt if it contains markdown syntax, or just plain text */}
                        <div className="post-excerpt">
                            {/* Limit excerpt length if needed, though util already does it */}
                            {post.excerpt}
                        </div>

                        <div className="post-footer">
                            <div className="post-tags">
                                {post.tags.map(tag => (
                                    <span key={tag} className="tag">
                                        <Tag size={12} style={{ display: 'inline', marginRight: '4px' }} />
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <button className="read-more" onClick={() => onPostClick(post)} aria-label="Read full post">
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                </article>
            ))}
        </div>
    );
};

export default PostList;
