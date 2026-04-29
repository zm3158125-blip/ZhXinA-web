import React from 'react';
import {
    Search,
    Home,
    Archive,
    Link as LinkIcon,
    MoreHorizontal,
    User
} from 'lucide-react';
import './Header.css';

interface HeaderProps {
    activeView: string;
    onNavigate: (view: string) => void;
    onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeView, onNavigate, onSearch }) => {
    const [isDark, setIsDark] = React.useState(() => {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) document.documentElement.classList.add('dark');
        return prefersDark;
    });

    // Listen for system theme changes
    React.useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e: MediaQueryListEvent) => {
            setIsDark(e.matches);
            if (e.matches) document.documentElement.classList.add('dark');
            else document.documentElement.classList.remove('dark');
        };
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const toggleTheme = () => {
        setIsDark(!isDark);
        document.documentElement.classList.toggle('dark');
    };

    return (
        <header className="header glass-card">
            <div className="header-content">
                <div className="logo-section">
                    <img src="/logo.png" className="logo-icon" alt="Logo" />
                    <span>隆隆是我</span>
                </div>

                {/* ===== 玻璃导航 (Radio Group with Glider) ===== */}
                <nav className="nav-menu">
                    {/* Radios (Hidden) */}
                    <input type="radio" name="nav" id="nav-home" checked={activeView === 'home'} onChange={() => onNavigate('home')} />
                    <input type="radio" name="nav" id="nav-archives" checked={activeView === 'archives'} onChange={() => onNavigate('archives')} />
                    <input type="radio" name="nav" id="nav-links" checked={activeView === 'friendly-links'} onChange={() => onNavigate('friendly-links')} />
                    <input type="radio" name="nav" id="nav-profile" checked={activeView === 'profile'} onChange={() => onNavigate('profile')} />
                    <input type="radio" name="nav" id="nav-others" checked={activeView === 'others'} onChange={() => onNavigate('others')} />

                    {/* Nav Items */}
                    <label htmlFor="nav-home" className="nav-item">
                        <Home size={18} /> 首页
                    </label>

                    <label htmlFor="nav-archives" className="nav-item">
                        <Archive size={18} /> 归档
                    </label>

                    <label htmlFor="nav-links" className="nav-item">
                        <LinkIcon size={18} /> 友链
                    </label>

                    <label htmlFor="nav-profile" className="nav-item">
                        <User size={18} /> 我的
                    </label>

                    <label htmlFor="nav-others" className="nav-item">
                        <MoreHorizontal size={18} /> 其他
                    </label>

                    {/* The Glider Pill */}
                    <div className="glass-glider"></div>
                </nav>

                <div className="header-actions">
                    <div className="search-bar">
                        <Search size={16} />
                        <input placeholder="Search" onChange={e => onSearch(e.target.value)} />
                    </div>

                    <button className={`theme-toggle ${isDark ? 'dark-active' : ''}`} onClick={toggleTheme}>
                        <img
                            src={isDark ? '/Navigation_bar/Evening.png' : '/Navigation_bar/Sun.png'}
                            alt={isDark ? '切换到浅色模式' : '切换到深色模式'}
                            className="theme-icon"
                        />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
