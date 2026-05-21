import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../hooks/useApp';
import PostList from '../components/PostList';
import { usePosts } from '../hooks/usePosts';

const ArchivesView = React.lazy(() => import('../components/ArchivesView'));
const FriendlyLinksView = React.lazy(() => import('../components/FriendlyLinksView'));
const MyView = React.lazy(() => import('../components/MyView'));
const OthersView = React.lazy(() => import('../components/OthersView'));
const PostDetail = React.lazy(() => import('../components/PostDetail'));
const ClearDataPage = React.lazy(() => import('../pages/ClearDataPage'));
const HideEnvPage = React.lazy(() => import('../pages/HideEnvPage'));

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -6 },
};

const pageTransition = {
  type: 'tween' as const,
  ease: 'easeOut' as const,
  duration: 0.28,
};

const ContentRouter: React.FC = () => {
  const {
    activeView,
    selectedPost,
    activeArticle,
    searchQuery,
    openPost,
    openArticle,
    goBack,
  } = useApp();
  const { filteredPosts, loading } = usePosts(searchQuery);

  const renderView = () => {
    switch (activeView) {
      case 'home':
        return <PostList posts={filteredPosts} loading={loading} onPostClick={openPost} />;
      case 'post-detail':
        return selectedPost ? (
          <PostDetail post={selectedPost} onBack={goBack} />
        ) : (
          <PostList posts={filteredPosts} loading={loading} onPostClick={openPost} />
        );
      case 'article-detail':
        switch (activeArticle) {
          case 'clear-data':
            return <ClearDataPage onBack={goBack} />;
          case 'hide-env':
            return <HideEnvPage onBack={goBack} />;
          default:
            return (
              <div className="glass-card empty-state">Article not found</div>
            );
        }
      case 'archives':
        return <ArchivesView />;
      case 'friendly-links':
        return <FriendlyLinksView />;
      case 'profile':
        return <MyView />;
      case 'others':
        return <OthersView onArticleClick={openArticle} />;
      default:
        return (
          <div className="glass-card empty-state">Section: {activeView}</div>
        );
    }
  };

  const motionKey =
    activeView === 'post-detail' && selectedPost
      ? `post-${selectedPost.id}`
      : activeView;

  return (
    <motion.div
      key={motionKey}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <Suspense fallback={<div className="glass-card loading-state">Loading...</div>}>
        {renderView()}
      </Suspense>
    </motion.div>
  );
};

export default ContentRouter;
