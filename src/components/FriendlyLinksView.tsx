import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Search, Wrench } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchTools, type ToolItem } from '../services/toolService';
import LinkCard from './LinkCard';
import './FriendlyLinksView.css';

const CACHE_KEY = 'zhxin_tools_cache';
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

interface CacheData {
  tools: ToolItem[];
  timestamp: number;
}

function loadCache(): ToolItem[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cached = JSON.parse(raw) as CacheData;
    if (Date.now() - cached.timestamp > CACHE_TTL) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
    return cached.tools;
  } catch {
    return null;
  }
}

function saveCache(tools: ToolItem[]) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ tools, timestamp: Date.now() }));
  } catch {
    // ignore
  }
}

const FriendlyLinksView: React.FC = () => {
  const [tools, setTools] = useState<ToolItem[]>(() => loadCache() ?? []);
  const [loading, setLoading] = useState(() => !loadCache());
  const [searchQuery, setSearchQuery] = useState('');
  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    const cached = loadCache();
    if (cached) {
      setTools(cached);
      setLoading(false);
      // background refresh
      fetchTools()
        .then((data) => {
          setTools(data);
          saveCache(data);
        })
        .catch(() => {});
      return;
    }

    setLoading(true);
    fetchTools()
      .then((data) => {
        setTools(data);
        saveCache(data);
      })
      .catch((e) => console.error('Failed to load tools:', e))
      .finally(() => setLoading(false));
  }, []);

  const filteredTools = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return tools;
    return tools.filter(
      (tool) =>
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.url.toLowerCase().includes(q)
    );
  }, [tools, searchQuery]);

  const SkeletonCard = () => (
    <div className="link-card card skeleton-card">
      <div className="link-card-top">
        <div className="skeleton-icon" />
        <div className="skeleton-text-group">
          <div className="skeleton-line s-name" />
          <div className="skeleton-line s-host" />
        </div>
      </div>
      <div className="skeleton-line s-desc" />
      <div className="skeleton-line s-desc short" />
      <div className="link-card-foot">
        <div className="skeleton-line s-badge" />
        <div className="skeleton-line s-btn-group" />
      </div>
    </div>
  );

  return (
    <div className="friend-links-view page-shell card">
      <header className="page-header">
        <h1 className="page-title">
          <Wrench size={24} className="title-icon-inline" />
          推荐工具
        </h1>
        <p className="page-desc">免费无收益 · 实用工具推荐</p>
      </header>

      <div className="friend-links-toolbar">
        <div className="friend-search">
          <Search size={18} />
          <input
            type="text"
            placeholder="搜索工具名称或描述…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="friend-links-grid">
          {[1, 2, 3, 4].map((n) => (
            <SkeletonCard key={n} />
          ))}
        </div>
      ) : (
        <div className="friend-links-grid">
          <AnimatePresence mode="popLayout">
            {filteredTools.length > 0 ? (
              filteredTools.map((tool) => (
                <motion.div
                  key={tool.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <LinkCard
                    name={tool.name}
                    url={tool.url}
                    description={tool.description}
                    logo={tool.icon}
                    badge={tool.badgeType}
                  />
                </motion.div>
              ))
            ) : (
              <p className="empty-state">
                {searchQuery ? '没有找到匹配的工具' : '暂无工具推荐'}
              </p>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default FriendlyLinksView;
