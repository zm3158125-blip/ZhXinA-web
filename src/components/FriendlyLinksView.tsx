import React, { useState, useMemo } from 'react';
import { Search, Link2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FRIEND_LINKS, CATEGORIES } from '../data/friendLinks';
import LinkCard from './LinkCard';
import './FriendlyLinksView.css';

const FriendlyLinksView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredLinks = useMemo(() => {
    return FRIEND_LINKS.filter((link) => {
      if (selectedCategory !== 'all' && link.category !== selectedCategory) return false;
      const query = searchQuery.toLowerCase();
      return (
        link.name.toLowerCase().includes(query) ||
        link.description.toLowerCase().includes(query) ||
        link.url.toLowerCase().includes(query)
      );
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="friend-links-view page-shell card">
      <header className="page-header">
        <h1 className="page-title">
          <Link2 size={24} className="title-icon-inline" />
          友链
        </h1>
        <p className="page-desc">发现更多优秀网站</p>
      </header>

      <div className="friend-links-toolbar">
        <div className="friend-search">
          <Search size={18} />
          <input
            type="text"
            placeholder="搜索名称或描述…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="category-tabs" role="tablist">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={selectedCategory === category.id}
              className={`category-tab ${selectedCategory === category.id ? 'is-active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <div className="friend-links-grid">
        <AnimatePresence mode="popLayout">
          {filteredLinks.length > 0 ? (
            filteredLinks.map((link) => (
              <motion.div
                key={link.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <LinkCard link={link} />
              </motion.div>
            ))
          ) : (
            <p className="empty-state">没有找到相关友链</p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FriendlyLinksView;
