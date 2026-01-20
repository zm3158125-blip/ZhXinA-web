import React from 'react';
import { FileText, Tag } from 'lucide-react';
import type { PostData } from '../utils/markdown';
import './Sidebar.css';

interface SidebarProps {
    posts: PostData[];
    showStats?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ posts, showStats = true }) => {
    const postCount = posts.length;
    // Calculate unique tags
    const allTags = posts.flatMap(post => post.tags);
    const uniqueTags = new Set(allTags);
    const tagCount = uniqueTags.size;

    return (
        <div className="sidebar">
            {showStats && (
                <div className="stats-card glass-card">
                    <h3 className="sidebar-title">
                        <span className="title-bar"></span>
                        Site Statistics
                    </h3>

                    <div className="stats-list">
                        <div className="stats-row">
                            <div className="stats-label">
                                <FileText size={16} />
                                <span>文章总数</span>
                            </div>
                            <span className="stats-count">{postCount}</span>
                        </div>

                        <div className="stats-row">
                            <div className="stats-label">
                                <Tag size={16} />
                                <span>标签数量</span>
                            </div>
                            <span className="stats-count">{tagCount}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
