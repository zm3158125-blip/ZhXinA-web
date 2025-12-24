
import React from 'react';
import { Calendar } from 'lucide-react';
import './PostList.css'; // 为实现玻璃拟态复用帖子列表样式

const ArchivesView: React.FC = () => {
    return (
        <div className="post-list glass-card">
            <h2 className="section-title">
                <Calendar className="title-icon" />
                归档
            </h2>
            <div className="archive-content" style={{ padding: '20px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                <p>文章归档正在建设中...</p>
                <p>Archive Content Coming Soon</p>
            </div>
        </div>
    );
};

export default ArchivesView;
