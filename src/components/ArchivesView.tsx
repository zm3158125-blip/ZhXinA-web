import React, { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';
import './ArchivesView.css';

const LAUNCH_DATE = new Date('2026-01-11T00:00:00').getTime();

const ArchivesView: React.FC = () => {
  const [timeRunning, setTimeRunning] = useState({ days: 0, hours: 0, seconds: 0 });

  useEffect(() => {
    const calculate = () => {
      const diff = Date.now() - LAUNCH_DATE;
      setTimeRunning({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="archives-view page-shell card">
      <header className="page-header">
        <h1 className="page-title">
          <Calendar size={24} className="title-icon-inline" />
          归档
        </h1>
        <p className="page-desc">站点运行记录</p>
      </header>

      <div className="runtime-card">
        <div className="runtime-icon">
          <Clock size={28} />
        </div>
        <div className="runtime-content">
          <h3>网站运行统计</h3>
          <p>
            本网站于 1 月 11 日上线，已运行
            <span className="highlight">{timeRunning.days}</span> 天
            <span className="highlight">{timeRunning.hours}</span> 小时
            <span className="highlight">{timeRunning.seconds}</span> 秒
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArchivesView;
