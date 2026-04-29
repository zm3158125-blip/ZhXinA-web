import React, { useEffect, useState } from 'react';

const MobileNotice: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            const userAgent = navigator.userAgent.toLowerCase();
            const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(userAgent);
            const screenWidth = window.innerWidth;
            
            setIsMobile(isMobileDevice || screenWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    if (!isMobile || isHidden) return null;

    return (
        <div className="mobile-notice">
            <div className="mobile-notice-content">
                <div className="notice-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 0 18 14.158V5.842a2.032 2.032 0 0 0 1.595-1.757L20 3h-5v14z"></path>
                        <path d="M1 17h5l1.405-1.405A2.032 2.032 0 0 1 8 14.158V5.842a2.032 2.032 0 0 1-1.595-1.757L6 3H1v14z"></path>
                        <path d="M8 17v6"></path>
                        <path d="M16 17v6"></path>
                        <path d="M4 21h16"></path>
                    </svg>
                </div>
                <div className="notice-text">
                    <p className="notice-title">建议使用电脑端访问</p>
                    <p className="notice-desc">为获得更好的浏览体验，推荐在电脑上访问本网站</p>
                </div>
                <button 
                    className="notice-close" 
                    onClick={() => setIsHidden(true)}
                    aria-label="关闭提示"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default MobileNotice;