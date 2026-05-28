import React from 'react';
import {
  Home,
  Archive,
  Link as LinkIcon,
  User,
  MoreHorizontal,
  FileText,
  Tag,
} from 'lucide-react';
import type { AppView } from '../context/appContext';
import type { PostData } from '../utils/markdown';
import { useApp } from '../hooks/useApp';
import './SiteSidebar.css';

const NAV_ITEMS: { id: AppView; label: string; icon: React.ReactNode }[] = [
  { id: 'home', label: '首页', icon: <Home size={20} /> },
  { id: 'archives', label: '归档', icon: <Archive size={20} /> },
  { id: 'friendly-links', label: '友链', icon: <LinkIcon size={20} /> },
  { id: 'profile', label: '我的', icon: <User size={20} /> },
  { id: 'others', label: '其他', icon: <MoreHorizontal size={20} /> },
];

interface SiteSidebarProps {
  posts: PostData[];
  showExtras?: boolean;
}

const SiteSidebar: React.FC<SiteSidebarProps> = ({ posts, showExtras = false }) => {
  const { activeView, navigate } = useApp();

  const isActive = (view: AppView) =>
    activeView === view ||
    (view === 'home' && activeView === 'post-detail') ||
    (view === 'others' && activeView === 'article-detail');

  const postCount = posts.length;
  const tagCount = new Set(posts.flatMap((p) => p.tags)).size;

  return (
    <aside className="site-sidebar" aria-label="站点导航">
      <div className="sidebar-brand">
        <img src="/logo.png" alt="" className="sidebar-logo" />
        <div className="sidebar-brand-text">
          <span className="sidebar-site-name">隆隆是我</span>
          <span className="sidebar-site-tag">Lon Lsme</span>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="主导航">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`sidebar-nav-item ${isActive(item.id) ? 'is-active' : ''}`}
            onClick={() => navigate(item.id)}
            aria-current={isActive(item.id) ? 'page' : undefined}
          >
            <span className="sidebar-nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {showExtras && (
        <div className="sidebar-extras">
          <div className="sidebar-profile card">
            <img src="/logo.svg" alt="" className="sidebar-avatar" />
            <div className="sidebar-profile-info">
              <strong>LonLsMe</strong>
              <span>Frontend Developer</span>
            </div>
            <div className="sidebar-socials">
              <a
                href="https://github.com/zm3158125-blip"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                GH
              </a>
              <a
                href="https://space.bilibili.com/3493283730819516"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Bilibili"
              >
                B站
              </a>
              <a href="mailto:zlx528gtr@outlook.com" aria-label="Email">
                邮
              </a>
            </div>
          </div>

          <div className="sidebar-stats card">
            <h3 className="sidebar-stats-title">站点数据</h3>
            <div className="sidebar-stat-row">
              <FileText size={16} />
              <span>文章</span>
              <strong>{postCount}</strong>
            </div>
            <div className="sidebar-stat-row">
              <Tag size={16} />
              <span>标签</span>
              <strong>{tagCount}</strong>
            </div>
          </div>
        </div>
      )}

      <p className="sidebar-footer">© zhxin</p>
    </aside>
  );
};

export default SiteSidebar;
