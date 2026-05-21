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
    alert('链接已复制!');
  };

  return (
    <div className="link-card card">
      <div className="link-card-top">
        <div className="link-logo-wrap">
          <img
            src={link.logo}
            alt=""
            className="link-logo"
            onError={(e) => {
              e.currentTarget.src = '/vite.svg';
            }}
          />
        </div>
        <div className="link-card-info">
          <h3 className="link-name">{link.name}</h3>
          <span className="link-host">{new URL(link.url).hostname}</span>
        </div>
      </div>

      <p className="link-desc">{link.description}</p>

      <footer className="link-card-foot">
        <span className="link-cat">{link.category}</span>
        <div className="link-actions">
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary link-visit"
          >
            <ExternalLink size={14} />
            访问
          </a>
          <button
            type="button"
            onClick={copyToClipboard}
            className="link-copy"
            title="复制链接"
            aria-label="复制链接"
          >
            <Copy size={16} />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default LinkCard;
