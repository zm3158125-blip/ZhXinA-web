import React from 'react';
import { Home, Archive, Link as LinkIcon, User, MoreHorizontal, Search, Menu } from 'lucide-react';
import './Header.css';

interface HeaderProps {
    onNavigate: (view: string) => void;
    onWallpaperChange: (mode: string) => void;
    onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, onSearch }) => {
    const [isDark, setIsDark] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const toggleTheme = () => {
        setIsDark(!isDark);
        document.documentElement.classList.toggle('dark');
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleMobileNav = (view: string) => {
        onNavigate(view);
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="header glass-card">
            <div className="header-content">
                <div className="logo-section">
                    <img src="/logo.png" alt="Logo" className="logo-icon" />
                    <span className="logo-text">隆隆是我</span>
                </div>

                <nav className="nav-menu">
                    <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>
                        <Home size={18} />
                        <span>首页</span>
                    </a>
                    <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); onNavigate('archives'); }}>
                        <Archive size={18} />
                        <span>归档</span>
                    </a>
                    <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); onNavigate('friendly-links'); }}>
                        <LinkIcon size={18} />
                        <span>友链</span>
                    </a>

                    {/* Dropdown for "My" */}
                    <div className="nav-item dropdown-container">
                        <div className="dropdown-trigger">
                            <User size={18} />
                            <span>我的</span>
                        </div>
                        <div className="dropdown-menu glass-card">
                            <a href="#" className="dropdown-item">
                                <span className="icon">📺</span> 番剧
                            </a>
                            <a href="#" className="dropdown-item">
                                <span className="icon">📔</span> 日记
                            </a>
                            <a href="#" className="dropdown-item">
                                <span className="icon">🖼️</span> 相册
                            </a>
                            <a href="https://www.mi.com/redmi-k60ultra" className="dropdown-item">
                                <span className="icon">📱</span> 我的设备
                            </a>
                        </div>
                    </div>

                    <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); onNavigate('others'); }}>
                        <MoreHorizontal size={18} />
                        <span>其他</span>
                    </a>
                </nav>

                <div className="header-actions">
                    <div className="search-bar">
                        <Search size={16} />
                        <input
                            type="text"
                            placeholder="Search"
                            onChange={(e) => onSearch(e.target.value)}
                        />
                    </div>
                    <div className={`theme-toggle ${isDark ? 'dark-active' : ''}`} onClick={toggleTheme} role="button" tabIndex={0}>
                        <div className="toggle-track">
                            <div className="toggle-icon sun-icon">
                                <img src="/sun.svg" alt="Light Mode" />
                            </div>
                            <div className="toggle-icon moon-icon">
                                <img src="/bark.svg" alt="Dark Mode" />
                            </div>
                            <div className="toggle-thumb" />
                        </div>
                    </div>
                    <button
                        className="icon-btn mobile-only"
                        onClick={toggleMobileMenu}
                        aria-label="Menu"
                    >
                        <Menu size={20} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu glass-card ${isMobileMenuOpen ? 'open' : ''}`}>
                <a href="#" className="mobile-nav-item" onClick={(e) => { e.preventDefault(); handleMobileNav('home'); }}>
                    <Home size={20} />
                    <span>首页</span>
                </a>
                <a href="#" className="mobile-nav-item" onClick={(e) => { e.preventDefault(); handleMobileNav('archives'); }}>
                    <Archive size={20} />
                    <span>归档</span>
                </a>
                <a href="#" className="mobile-nav-item" onClick={(e) => { e.preventDefault(); handleMobileNav('friendly-links'); }}>
                    <LinkIcon size={20} />
                    <span>友链</span>
                </a>

                <div className="mobile-nav-divider">我的</div>

                <a href="#" className="mobile-nav-item sub-item">
                    <span className="icon">📺</span> 番剧
                </a>
                <a href="#" className="mobile-nav-item sub-item">
                    <span className="icon">📔</span> 日记
                </a>
                <a href="#" className="mobile-nav-item sub-item">
                    <span className="icon">🖼️</span> 相册
                </a>
                <a href="#" className="mobile-nav-item sub-item">
                    <span className="icon">📱</span> 我的设备
                </a>

                <div className="mobile-nav-divider"></div>

                <a href="#" className="mobile-nav-item" onClick={(e) => { e.preventDefault(); handleMobileNav('others'); }}>
                    <MoreHorizontal size={20} />
                    <span>其他</span>
                </a>
            </div>
        </header>
    );
};

export default Header;
