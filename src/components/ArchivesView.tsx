
import React from 'react';
import { Calendar } from 'lucide-react';
import './PostList.css'; // Reusing PostList styles for glass morphism

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
