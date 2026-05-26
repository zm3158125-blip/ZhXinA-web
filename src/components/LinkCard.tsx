import React from 'react';
import { ExternalLink, Copy } from 'lucide-react';
import './LinkCard.css';

interface LinkCardProps {
  name: string;
  url: string;
  description: string;
  logo: string;
  badge?: string;
}

const LinkCard: React.FC<LinkCardProps> = ({ name, url, description, logo, badge }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    alert('链接已复制!');
  };

  let hostname = '';
  try {
    hostname = new URL(url).hostname;
  } catch {
    hostname = url;
  }

  return (
    <div className="link-card card">
      <div className="link-card-top">
        <div className="link-logo-wrap">
          <img
            src={logo}
            alt=""
            className="link-logo"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/vite.svg';
            }}
          />
        </div>
        <div className="link-card-info">
          <h3 className="link-name">{name}</h3>
          <span className="link-host">{hostname}</span>
        </div>
      </div>

      <p className="link-desc">{description}</p>

      <footer className="link-card-foot">
        {badge ? (
          <span className="link-cat">{badge}</span>
        ) : (
          <span />
        )}
        <div className="link-actions">
          <a
            href={url}
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
