
import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import './PostList.css';

const OthersView: React.FC = () => {
    return (
        <div className="post-list glass-card">
            <h2 className="section-title">
                <MoreHorizontal className="title-icon" />
                其他
            </h2>
            <div className="others-content" style={{ padding: '20px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                <p>更多精彩内容敬请期待。</p>
                <p>Stay tuned for more.</p>
            </div>
        </div>
    );
};

export default OthersView;
