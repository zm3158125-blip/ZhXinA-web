
import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import './PostList.css'; // 为实现玻璃拟态复用帖子列表样式

const ArchivesView: React.FC = () => {
    // 网站上线时间：2026年1月11日
    const launchDate = new Date('2026-01-11T00:00:00').getTime();

    // 状态管理：已运行时间
    const [timeRunning, setTimeRunning] = useState({
        days: 0,
        hours: 0,
        seconds: 0
    });

    useEffect(() => {
        // 计算时间差的函数
        const calculateTimeRunning = () => {
            const now = new Date().getTime();
            const diff = now - launchDate;

            // 转换为天、小时、秒
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeRunning({ days, hours, seconds });
        };

        // 初始计算
        calculateTimeRunning();

        // 设置定时器，每秒更新一次
        const interval = setInterval(calculateTimeRunning, 1000);

        // 清理定时器
        return () => clearInterval(interval);
    }, [launchDate]);

    return (
        <div className="post-list glass-card">
            <h2 className="section-title">
                <Calendar className="title-icon" />
                归档
            </h2>

            {/* 网站运行时间显示 */}
            <div className="site-stats" style={{
                padding: '20px',
                textAlign: 'center',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderRadius: '12px',
                margin: '20px',
                border: '1px solid rgba(59, 130, 246, 0.3)'
            }}>
                <h3 style={{ color: 'var(--color-primary)', marginBottom: '15px' }}>网站运行统计</h3>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-main)', fontWeight: '500' }}>
                    本网站上线为1月11日，已运行
                    <span style={{ color: 'var(--color-primary)', fontWeight: '600', margin: '0 5px' }}>{timeRunning.days}</span>天
                    <span style={{ color: 'var(--color-primary)', fontWeight: '600', margin: '0 5px' }}>{timeRunning.hours}</span>小时
                    <span style={{ color: 'var(--color-primary)', fontWeight: '600', margin: '0 5px' }}>{timeRunning.seconds}</span>秒。
                </p>
            </div>

        </div>
    );
};

export default ArchivesView;
