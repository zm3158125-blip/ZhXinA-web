import React from 'react';
import './Hero.css';

const Hero: React.FC = () => {
    return (
        <div className="hero-section">
            <h1 className="hero-title">你今天又变好看了</h1>
            <p className="hero-subtitle">今天是平淡无奇的一天</p>
        </div>
    );
};

export default Hero;
