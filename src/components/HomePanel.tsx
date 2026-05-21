import React from 'react';
import { FileText, Tag } from 'lucide-react';
import type { PostData } from '../utils/markdown';
import './HomePanel.css';

interface HomePanelProps {
  posts: PostData[];
}

/** 移动端首页：资料与统计横条（桌面端在侧栏展示） */
const HomePanel: React.FC<HomePanelProps> = ({ posts }) => {
  const postCount = posts.length;
  const tagCount = new Set(posts.flatMap((p) => p.tags)).size;

  return (
    <div className="home-panel" aria-label="站点概览">
      <div className="home-panel-profile card">
        <img src="/logo.svg" alt="" className="home-panel-avatar" />
        <div>
          <strong>zhxin</strong>
          <span>Frontend Developer</span>
        </div>
      </div>
      <div className="home-panel-stat card">
        <FileText size={18} />
        <span>{postCount}</span>
        <small>文章</small>
      </div>
      <div className="home-panel-stat card">
        <Tag size={18} />
        <span>{tagCount}</span>
        <small>标签</small>
      </div>
    </div>
  );
};

export default HomePanel;
