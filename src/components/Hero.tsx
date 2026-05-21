import React from 'react';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <p className="hero-eyebrow">Welcome back</p>
      <h2 className="hero-title">你今天又变好看了</h2>
      <p className="hero-subtitle">今天是平淡无奇的一天</p>
    </section>
  );
};

export default Hero;
