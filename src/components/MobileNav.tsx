import React from 'react';
import { Home, Archive, Link as LinkIcon, User, MoreHorizontal } from 'lucide-react';
import type { AppView } from '../context/appContext';
import { useApp } from '../hooks/useApp';
import './SiteSidebar.css';

const NAV_ITEMS: { id: AppView; label: string; icon: React.ReactNode }[] = [
  { id: 'home', label: '首页', icon: <Home size={20} /> },
  { id: 'archives', label: '归档', icon: <Archive size={20} /> },
  { id: 'friendly-links', label: '友链', icon: <LinkIcon size={20} /> },
  { id: 'profile', label: '我的', icon: <User size={20} /> },
  { id: 'others', label: '其他', icon: <MoreHorizontal size={20} /> },
];

const MobileNav: React.FC = () => {
  const { activeView, navigate } = useApp();

  const isActive = (view: AppView) =>
    activeView === view ||
    (view === 'home' && activeView === 'post-detail') ||
    (view === 'others' && activeView === 'article-detail');

  return (
    <nav className="mobile-nav" aria-label="移动端导航">
      {NAV_ITEMS.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`mobile-nav-item ${isActive(item.id) ? 'is-active' : ''}`}
          onClick={() => navigate(item.id)}
          aria-current={isActive(item.id) ? 'page' : undefined}
        >
          <span>{item.icon}</span>
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default MobileNav;
