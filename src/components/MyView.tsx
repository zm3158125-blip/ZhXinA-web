import React, { useState } from 'react';
import { Github, Mail, X, ExternalLink, Play, User } from 'lucide-react';
import './MyView.css';

const contactLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/zm3158125-blip',
    icon: <Github size={22} />,
    color: '#333',
    bgColor: 'var(--color-bg-muted)',
  },
  {
    name: 'Bilibili',
    url: 'https://space.bilibili.com/3493283730819516',
    icon: <img src="/bilibilif.svg" alt="" width={22} height={22} />,
    color: '#FB7299',
    bgColor: 'rgba(251, 114, 153, 0.12)',
  },
  {
    name: 'Email',
    url: 'mailto:zlx528gtr@outlook.com',
    icon: <Mail size={22} />,
    color: '#EA4335',
    bgColor: 'rgba(234, 67, 53, 0.1)',
  },
];

const MyView: React.FC = () => {
  const [showDouyinModal, setShowDouyinModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  return (
    <div className="my-view page-shell card">
      <header className="page-header">
        <h1 className="page-title">
          <User size={24} className="title-icon-inline" />
          我的
        </h1>
        <p className="page-desc">欢迎通过以下方式与我联系</p>
      </header>

      <div className="my-grid">
        <section className="my-card card">
          <h2 className="my-card-title">联系我</h2>
          <div className="contact-links">
            {contactLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                className="contact-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="contact-link-icon" style={{ background: link.bgColor }}>
                  <span style={{ color: link.color }}>{link.icon}</span>
                </div>
                <span className="contact-link-name">{link.name}</span>
                <ExternalLink size={16} className="contact-link-arrow" />
              </a>
            ))}
          </div>
        </section>

        <section className="my-card card my-card--douyin">
          <h2 className="my-card-title">抖音</h2>
          <button
            type="button"
            className="media-tile"
            onClick={() => setShowDouyinModal(true)}
          >
            <img src="/douyin.png" alt="" className="media-tile-icon" />
            <span className="media-tile-label">点击查看二维码</span>
            <span className="media-tile-sub">抖音号: 36398056279</span>
          </button>
        </section>

        <section className="my-card card">
          <h2 className="my-card-title">江西工业职业技术学院(大专)</h2>
          <button
            type="button"
            className="media-tile"
            onClick={() => setShowVideoModal(true)}
          >
            <div className="media-tile-play">
              <Play size={24} />
            </div>
            <span className="media-tile-label">点击播放视频</span>
            <span className="media-tile-sub">宣传视频</span>
          </button>
        </section>
      </div>

      {showDouyinModal && (
        <div className="modal-overlay" onClick={() => setShowDouyinModal(false)}>
          <div className="modal-content card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close"
              onClick={() => setShowDouyinModal(false)}
              aria-label="关闭"
            >
              <X size={22} />
            </button>
            <img src="/douyin_name.png" alt="抖音二维码" className="modal-qr" />
            <p className="modal-highlight">抖音号: 36398056279</p>
            <p className="modal-tip">打开抖音扫描二维码关注我</p>
          </div>
        </div>
      )}

      {showVideoModal && (
        <div className="modal-overlay" onClick={() => setShowVideoModal(false)}>
          <div className="modal-content modal-content--video card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close"
              onClick={() => setShowVideoModal(false)}
              aria-label="关闭"
            >
              <X size={22} />
            </button>
            <video className="modal-video" controls autoPlay src="Video_1777439664347_782.mp4">
              您的浏览器不支持视频播放
            </video>
            <p className="modal-highlight">江西工业职业技术学院</p>
            <p className="modal-tip">点击空白处退出播放</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyView;
