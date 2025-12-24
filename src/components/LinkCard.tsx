import React from 'react';
import { ExternalLink, Copy } from 'lucide-react';
import type { FriendLink } from '../data/friendLinks';
import './LinkCard.css';

interface LinkCardProps {
    link: FriendLink;
}

const LinkCard: React.FC<LinkCardProps> = ({ link }) => {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(link.url);
        // Could add a toast notification here
        alert('链接已复制!');
    };

    return (
        <div className="link-card glass-card">
            <div className="link-header">
                <div className="link-logo-container">
                    <img src={link.logo} alt={link.name} className="link-logo" onError={(e) => (e.currentTarget.src = '/vite.svg')} />
                </div>
                <div className="link-info">
                    <h3 className="link-title">
                        {link.name}
                        <span className="link-url-text">{new URL(link.url).hostname}</span>
                    </h3>
                </div>
            </div>

            <p className="link-description">{link.description}</p>

            <div className="link-footer">
                <span className="link-category-tag">{link.category}</span>

                <div className="link-actions">
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="action-btn visit-btn">
                        <ExternalLink size={14} style={{ marginRight: '4px' }} />
                        访问
                    </a>
                    <button onClick={copyToClipboard} className="action-btn copy-btn" title="复制链接">
                        <Copy size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LinkCard;
