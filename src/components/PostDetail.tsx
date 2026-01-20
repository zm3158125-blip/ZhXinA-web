import React from 'react';
import ReactMarkdown from 'react-markdown';
import type { PostData } from '../utils/markdown';
import { ArrowLeft, Calendar, Tag, FileText } from 'lucide-react';
import './PostDetail.css';

interface PostDetailProps {
    post: PostData;
    onBack: () => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ post, onBack }) => {
    return (
        <div className="post-detail glass-card">
            <button onClick={onBack} className="back-btn">
                <ArrowLeft size={20} />
                <span>返回列表</span>
            </button>

            <article className="post-full-content">
                <header className="post-header">
                    <h1 className="post-detail-title">{post.title}</h1>

                    <div className="post-meta">
                        <div className="meta-item">
                            <Calendar size={16} />
                            <span>{post.date}</span>
                        </div>
                        <div className="meta-item">
                            <FileText size={16} />
                            <span>{post.wordCount} words</span>
                        </div>
                        {post.tags.map(tag => (
                            <div key={tag} className="tag">
                                <Tag size={12} style={{ marginRight: '4px' }} />
                                {tag}
                            </div>
                        ))}
                    </div>
                </header>

                <div className="markdown-body">
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>
            </article>
        </div>
    );
};

export default PostDetail;
