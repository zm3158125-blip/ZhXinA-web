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
    <article className="post-detail card page-shell">
      <button type="button" onClick={onBack} className="back-btn">
        <ArrowLeft size={18} />
        返回列表
      </button>

      <header className="post-detail-header">
        <h1 className="post-detail-title">{post.title}</h1>
        <div className="meta-row">
          <span className="meta-item">
            <Calendar size={16} />
            {post.date}
          </span>
          <span className="meta-item">
            <FileText size={16} />
            {post.wordCount} 字
          </span>
          {post.tags.map((tag) => (
            <span key={tag} className="tag-pill">
              <Tag size={12} />
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div className="markdown-body">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
};

export default PostDetail;
