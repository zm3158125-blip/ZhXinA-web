import React from 'react';
import { Github } from 'lucide-react';
import './ProfileCard.css';

const ProfileCard: React.FC = () => {
    return (
        <div className="parent">
            <div className="card">
                {/* Logo 圆形装饰区域 - 保留原设计的圆形层级 */}
                <div className="logo">
                    <span className="circle circle1"></span>
                    <span className="circle circle2"></span>
                    <span className="circle circle3"></span>
                    <span className="circle circle4"></span>
                    <span className="circle circle5">
                        {/* 替换为你的头像/图标 */}
                        <img
                            src="/logo.svg"
                            alt="Avatar"
                            style={{ width: '20px', height: '20px', borderRadius: '50%' }}
                        />
                    </span>
                </div>

                {/* 玻璃拟态层 */}
                <div className="glass"></div>

                {/* 个人信息内容区 */}
                <div className="content">
                    <span className="title">zhxin</span>
                    <span className="text">Frontend Developer / Design Enthusiast</span>
                </div>

                {/* 底部社交按钮和查看更多区域 */}
                <div className="bottom">
                    <div className="social-buttons-container">
                        {/* Github 社交按钮 */}
                        <a
                            href="https://github.com/zm3158125-blip"
                            className="social-button"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Github"
                        >
                            <Github className="svg" size={15} />
                        </a>

                        {/* Bilibili 社交按钮 */}
                        <a
                            href="https://space.bilibili.com/3493283730819516?spm_id_from=333.1007.0.0"
                            className="social-button"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Bilibili"
                        >
                            <img
                                src="/public/bilibilif.svg"
                                alt="Bilibili"
                                className="svg"
                                width={15}
                                height={15}
                            />
                        </a>

                        {/* 邮件社交按钮 */}
                        <a
                            href="mailto:zlx528gtr@outlook.com"
                            className="social-button"
                            aria-label="Email"
                        >
                            <img
                                src="/public/Email.svg"
                                alt="Email"
                                className="svg"
                                width={20}
                                height={20}
                            />
                        </a>
                    </div>

                    {/* 查看更多按钮 */}
                    <div className="view-more">
                        <button className="view-more-button">View more</button>
                        <svg className="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m6 9 6 6 6-6" strokeWidth="3" fill="none" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;