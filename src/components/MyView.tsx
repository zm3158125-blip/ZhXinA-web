import React, { useState } from 'react';
import { Github, Mail, X, ExternalLink, Play } from 'lucide-react';
import './MyView.css';

const MyView: React.FC = () => {
    const [showDouyinModal, setShowDouyinModal] = useState(false);
    const [showVideoModal, setShowVideoModal] = useState(false); // 视频弹窗

    const contactLinks = [
        {
            name: 'GitHub',
            url: 'https://github.com/zm3158125-blip',
            icon: <Github size={24} />,
            color: '#333',
            bgColor: '#f5f5f5'
        },
        {
            name: 'Bilibili',
            url: 'https://space.bilibili.com/3493283730819516',
            icon: <img src="/public/bilibilif.svg" alt="Bilibili" width={24} height={24} />,
            color: '#FB7299',
            bgColor: '#fff0f3'
        },
        {
            name: 'Email',
            url: 'mailto:zlx528gtr@outlook.com',
            icon: <Mail size={24} />,
            color: '#EA4335',
            bgColor: '#fff5f5'
        }
    ];

    return (
        <div className="my-view">
            <div className="contact-section">
                {/* 联系我卡片 */}
                <div className="glass-card contact-card">
                    <div className="contact-header">
                        <h2>联系我</h2>
                        <p>欢迎通过以下方式与我联系</p>
                    </div>
                    <div className="contact-links">
                        {contactLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.url}
                                className="contact-link"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div className="link-icon" style={{ background: link.bgColor }}>
                                    <span style={{ color: link.color }}>{link.icon}</span>
                                </div>
                                <div className="link-info">
                                    <span className="link-name">{link.name}</span>
                                    <ExternalLink size={14} className="link-arrow" />
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

                {/* 抖音卡片 */}
                <div className="glass-card douyin-section">
                    <div className="douyin-title">
                        <h3>抖音</h3>
                    </div>
                    <div
                        className="douyin-click-card"
                        onClick={() => setShowDouyinModal(true)}
                    >
                        <div className="douyin-icon-wrapper">
                            <img
                                src="/douyin.png"
                                alt="抖音"
                                className="douyin-name-icon"
                            />
                        </div>
                        <p className="douyin-hint">点击查看二维码</p>
                        <p className="douyin-id-text">抖音号: 36398056279</p>
                    </div>
                </div>

                {/* ====================== 南昌大学 视频卡片 ====================== */}
                <div className="glass-card video-section">
                    <div className="video-title">
                        <h3>江西工业职业技术学院(大专)</h3>
                    </div>
                    <div
                        className="video-click-card"
                        onClick={() => setShowVideoModal(true)}
                    >
                        <div className="video-icon-wrapper">
                            <Play size={28} color="#E83B3B" />
                        </div>
                        <p className="video-hint">点击播放视频</p>
                        <p className="video-desc">宣传视频</p>
                    </div>
                </div>
                {/* ================================================================= */}

            </div>

            {/* 抖音二维码弹窗 */}
            {showDouyinModal && (
                <div className="modal-overlay" onClick={() => setShowDouyinModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setShowDouyinModal(false)}>
                            <X size={24} />
                        </button>
                        <div className="douyin-qrcode-container">
                            <img
                                src="/douyin_name.png"
                                alt="抖音二维码"
                                className="douyin-qrcode-image"
                            />
                        </div>
                        <div className="modal-info">
                            <p className="modal-douyin-id">抖音号: 36398056279</p>
                            <p className="modal-tip">打开抖音扫描二维码关注我</p>
                        </div>
                    </div>
                </div>
            )}

            {/* ====================== 视频播放弹窗 ====================== */}
            {showVideoModal && (
                <div className="modal-overlay" onClick={() => setShowVideoModal(false)}>
                    <div className="modal-content video-modal" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setShowVideoModal(false)}>
                            <X size={24} />
                        </button>

                        <div className="video-player-container">
                            <video
                                className="ncu-video"
                                controls
                                autoPlay
                                width="100%"
                                src="Video_1777439664347_782.mp4"
                            >
                                您的浏览器不支持视频播放
                            </video>
                        </div>

                        <div className="modal-info">
                            <p className="modal-video-title">江西工业职业技术学院</p>
                            <p className="modal-tip">点击关闭或空白处退出播放</p>
                        </div>
                    </div>
                </div>
            )}
            {/* =========================================================== */}

        </div>
    );
};

export default MyView;