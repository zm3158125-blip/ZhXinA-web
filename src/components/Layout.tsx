import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './Header';
import Hero from './Hero';
import ProfileCard from './ProfileCard';
import PostList from './PostList';
import Sidebar from './Sidebar';
import ArchivesView from './ArchivesView';
import FriendlyLinksView from './FriendlyLinksView';
import OthersView from './OthersView';
import './Layout.css';

import PostDetail from './PostDetail';
import ClearDataPage from '../pages/ClearDataPage';
import HideEnvPage from '../pages/HideEnvPage';
import type { PostData } from '../utils/markdown';

// Import getAllPosts
import { getAllPosts } from '../utils/markdown';


const Layout: React.FC = () => {
    const [activeView, setActiveView] = useState('home');
    const [previousView, setPreviousView] = useState('home'); // New state for previous view
    const [selectedPost, setSelectedPost] = useState<PostData | null>(null);
    const [wallpaperMode, setWallpaperMode] = useState('default');
    const [activeArticle, setActiveArticle] = useState<string | null>(null); // New state for active article page

    // New state for posts and search
    const [posts, setPosts] = useState<PostData[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    // Fetch posts on mount
    React.useEffect(() => {
        const loadPosts = async () => {
            try {
                const data = await getAllPosts();
                setPosts(data);
            } catch (error) {
                console.error("Failed to load posts", error);
            } finally {
                setLoading(false);
            }
        };
        loadPosts();
    }, []);

    // Filter posts based on search query
    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    // Handle standard navigation
    const handleNavigate = (view: string) => {
        setActiveView(view);
        setActiveArticle(null); // Reset article state when navigating to other views
        if (view !== 'post-detail') {
            setSelectedPost(null);
        }
    };

    // Handle post selection
    const handlePostClick = (post: PostData) => {
        setPreviousView(activeView); // Save current view before navigating to post detail
        setSelectedPost(post);
        setActiveView('post-detail');
    };

    // Handle article page navigation
    const handleArticleNavigate = (articleId: string) => {
        setPreviousView(activeView); // Save current view
        setActiveArticle(articleId);
        setActiveView('article-detail');
    };

    // Animation variants
    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        in: { opacity: 1, y: 0 },
        out: { opacity: 0, y: -20 }
    };

    const pageTransition = {
        type: "tween" as const,
        ease: "easeInOut" as const,
        duration: 0.5
    };

    const renderContent = () => {
        return (
            <motion.div
                key={activeView === 'post-detail' && selectedPost ? `post-${selectedPost.id}` : activeView}
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
            >
                {(() => {
                    switch (activeView) {
                        case 'home': return <PostList posts={filteredPosts} loading={loading} onPostClick={handlePostClick} />;
                        case 'post-detail':
                            return selectedPost ? (
                                <PostDetail
                                    post={selectedPost}
                                    onBack={() => handleNavigate(previousView)}
                                />
                            ) : <PostList posts={filteredPosts} loading={loading} onPostClick={handlePostClick} />;
                        case 'article-detail':
                            switch (activeArticle) {
                                case 'clear-data':
                                    return <ClearDataPage onBack={() => handleNavigate(previousView)} />;
                                case 'hide-env':
                                    return <HideEnvPage onBack={() => handleNavigate(previousView)} />;
                                default:
                                    return <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', color: '#fff' }}>Article not found</div>;
                            }
                        case 'archives': return <ArchivesView />;
                        case 'friendly-links': return <FriendlyLinksView />;
                        case 'others': return <OthersView onArticleClick={handleArticleNavigate} />;
                        default: return <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', color: '#fff' }}>Section: {activeView}</div>;
                    }
                })()}
            </motion.div>
        );
    };

    return (
        <div className={`app-layout ${wallpaperMode}`}>
            {/* Dynamic styles for Wallpaper Modes */}
            <style>{`
                /* Fullscreen Mode (Default behavior) */
                ${wallpaperMode === 'fullscreen' || wallpaperMode === 'default' ? `
                    body {
                        background: radial-gradient(circle, #f3e5f5, #14708c);
                        background-attachment: fixed;
                        background-repeat: no-repeat;
                    }
                ` : ''}

                /* Hide Wallpaper Mode */
                ${wallpaperMode === 'none' ? `
                    body {
                        background-image: none !important;
                        background-color: var(--color-bg-light);
                    }
                ` : ''}

                /* Banner Mode */
                ${wallpaperMode === 'banner' ? `
                    body {
                        background-image: none !important;
                        background-color: var(--color-bg-light);
                    }
                    /* In Banner mode, hero section gets the image */
                ` : ''}
            `}</style>

            <Header
                onNavigate={handleNavigate}
                onWallpaperChange={setWallpaperMode}
                onSearch={setSearchQuery}
            />

            {/* Banner Mode Hero Background Wrapper */}
            {wallpaperMode === 'banner' && activeView === 'home' && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '500px', // Adjust height as needed
                    backgroundImage: "url('/bg.webp')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: -1,
                    maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
                }} />
            )}

            <main className="main-container">
                <AnimatePresence mode="wait">
                    {activeView === 'home' && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                            <Hero />
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="content-grid">
                    <aside className="left-column">
                        {activeView === 'home' && <ProfileCard />}
                    </aside>

                    <section className="center-column" style={{ overflow: 'hidden' }}>
                        <AnimatePresence mode="wait">
                            {renderContent()}
                        </AnimatePresence>
                    </section>

                    <aside className="right-column">
                        <Sidebar posts={posts} showStats={activeView === 'home'} />
                    </aside>
                </div>
            </main>
        </div>
    );
};

export default Layout;
