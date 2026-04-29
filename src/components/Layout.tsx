import React, { useState, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './Header';
import Hero from './Hero';
import ProfileCard from './ProfileCard';
import PostList from './PostList';
import Sidebar from './Sidebar';
import MobileNotice from './MobileNotice';

// Dynamic imports for code splitting
const ArchivesView = React.lazy(() => import('./ArchivesView'));
const FriendlyLinksView = React.lazy(() => import('./FriendlyLinksView'));
const MyView = React.lazy(() => import('./MyView'));
const OthersView = React.lazy(() => import('./OthersView'));
const PostDetail = React.lazy(() => import('./PostDetail'));
const ClearDataPage = React.lazy(() => import('../pages/ClearDataPage'));
const HideEnvPage = React.lazy(() => import('../pages/HideEnvPage'));

import './Layout.css';
import type { PostData } from '../utils/markdown';

// Import getAllPosts
import { getAllPosts } from '../utils/markdown';


const Layout: React.FC = () => {
    const [activeView, setActiveView] = useState('home');
    const [previousView, setPreviousView] = useState('home');
    const [selectedPost, setSelectedPost] = useState<PostData | null>(null);
    const [activeArticle, setActiveArticle] = useState<string | null>(null);

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
                <Suspense fallback={<div className="glass-card" style={{ padding: '2rem', textAlign: 'center', color: '#fff' }}>Loading...</div>}>
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
                            case 'profile': return <MyView />;
                            case 'others': return <OthersView onArticleClick={handleArticleNavigate} />;
                            default: return <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', color: '#fff' }}>Section: {activeView}</div>;
                        }
                    })()}
                </Suspense>
            </motion.div>
        );
    };

    return (
        <div className="app-layout">
            <style>{`
                body {
                    background-color: var(--color-bg-light);
                    transition: background-color 0.3s ease;
                }
            `}</style>

            <Header
                    activeView={activeView}
                    onNavigate={handleNavigate}
                    onSearch={setSearchQuery}
                />

                <MobileNotice />

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

                    <section className="center-column" style={{ overflowY: 'auto' }}>
                        <AnimatePresence mode="wait">
                            {renderContent()}
                        </AnimatePresence>
                    </section>

                    <aside className="right-column">
                        {activeView !== 'root-tutorial' && <Sidebar posts={posts} showStats={activeView === 'home'} />}
                    </aside>
                </div>
            </main>
        </div>
    );
};

export default Layout;
