import React from 'react';
import { Github, Twitter, Mail } from 'lucide-react';
import './ProfileCard.css';

const ProfileCard: React.FC = () => {
    return (
        <div className="profile-card glass-card">
            <div className="profile-image-container">
                <img
                    src="./public/logo.svg"
                    alt="Avatar"
                    className="profile-avatar"
                />
            </div>
            <h2 className="profile-name">zhxin</h2>
            <p className="profile-bio">Frontend Developer / Design Enthusiast</p>

            <div className="profile-socials">
                <a href="https://github.com/zm3158125-blip" className="social-link"><Github size={20} /></a>
                <a href="https://space.bilibili.com/3493283730819516?spm_id_from=333.1007.0.0" className="social-link"><Twitter size={20} /></a>
                <a href="mailto:zlx528gtr@outlook.com" className="social-link"><Mail size={20} /></a>
            </div>
        </div>
    );
};

export default ProfileCard;
