import React, { useState } from 'react';
import { Search, Sun, Moon, X } from 'lucide-react';
import { useApp } from '../hooks/useApp';
import { useTheme } from '../hooks/useTheme';
import { useIsMobile } from '../hooks/useMediaQuery';
import './TopBar.css';

const VIEW_TITLES: Record<string, string> = {
  home: '首页',
  archives: '归档',
  'friendly-links': '友链',
  profile: '我的',
  others: '其他',
  'post-detail': '文章',
  'article-detail': '教程',
};

const TopBar: React.FC = () => {
  const { activeView, searchQuery, setSearchQuery } = useApp();
  const { isDark, toggleTheme } = useTheme();
  const isMobile = useIsMobile();
  const [searchOpen, setSearchOpen] = useState(false);

  const title = VIEW_TITLES[activeView] ?? '博客';

  return (
    <header className="topbar">
      <div className="topbar-inner">
        {isMobile && (
          <div className="topbar-mobile-brand">
            <img src="/logo.png" alt="" />
            <span>隆隆是我</span>
          </div>
        )}

        {!isMobile && <h1 className="topbar-title">{title}</h1>}

        <div className="topbar-actions">
          <div className={`topbar-search ${searchOpen ? 'is-open' : ''}`}>
            <Search size={18} aria-hidden />
            <input
              type="search"
              placeholder="搜索文章、标签…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="搜索"
            />
            {isMobile && searchOpen && (
              <button
                type="button"
                className="search-close"
                onClick={() => setSearchOpen(false)}
                aria-label="关闭搜索"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {isMobile && (
            <button
              type="button"
              className="topbar-icon-btn"
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="搜索"
            >
              <Search size={20} />
            </button>
          )}

          <button
            type="button"
            className="topbar-icon-btn theme-btn"
            onClick={toggleTheme}
            aria-label={isDark ? '浅色模式' : '深色模式'}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>

      {isMobile && <h1 className="topbar-page-title">{title}</h1>}
    </header>
  );
};

export default TopBar;
