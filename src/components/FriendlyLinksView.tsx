import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FRIEND_LINKS, CATEGORIES } from '../data/friendLinks';
import LinkCard from './LinkCard';
import './FriendlyLinksView.css';

const FriendlyLinksView: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const filteredLinks = useMemo(() => {
        return FRIEND_LINKS.filter(link => {
            // Filter by Category
            if (selectedCategory !== 'all' && link.category !== selectedCategory) {
                return false;
            }

            // Filter by Search Query (Name, Description, URL)
            const query = searchQuery.toLowerCase();
            return (
                link.name.toLowerCase().includes(query) ||
                link.description.toLowerCase().includes(query) ||
                link.url.toLowerCase().includes(query)
            );
        });
    }, [searchQuery, selectedCategory]);

    return (
        <div className="friend-links-container glass-card fade-in">
            <div className="friend-links-header">
                <div className="header-title-row">
                    <div className="title-section">
                        <h1>
                            <span className="title-decoration">|</span> 友链
                        </h1>
                        <p className="subtitle">发现更多优秀网站</p>
                    </div>
                </div>

                <div className="search-section">
                    <div className="search-input-wrapper">
                        <Search className="search-icon" size={20} />
                        <input
                            type="text"
                            placeholder="搜索友链名称或描述..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                    </div>
                </div>

                <div className="category-filter">
                    {CATEGORIES.map(category => (
                        <button
                            key={category.id}
                            className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(category.id)}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="friend-links-grid">
                <AnimatePresence>
                    {filteredLinks.length > 0 ? (
                        filteredLinks.map(link => (
                            <motion.div
                                key={link.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                            >
                                <LinkCard link={link} />
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="no-results"
                        >
                            <p>没有找到相关友链...</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default FriendlyLinksView;
