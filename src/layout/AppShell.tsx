import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SiteSidebar from '../components/SiteSidebar';
import MobileNav from '../components/MobileNav';
import TopBar from '../components/TopBar';
import Hero from '../components/Hero';
import HomePanel from '../components/HomePanel';
import ContentRouter from './ContentRouter';
import { useApp } from '../hooks/useApp';
import { usePosts } from '../hooks/usePosts';

const AppShell: React.FC = () => {
  const { isHome, searchQuery } = useApp();
  const { posts } = usePosts(searchQuery);

  return (
    <div className="app-layout">
      <SiteSidebar posts={posts} showExtras={isHome} />

      <div className="site-main">
        <TopBar />

        <div className="main-scroll">
          <AnimatePresence mode="wait">
            {isHome && (
              <motion.div
                key="hero"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                <Hero />
              </motion.div>
            )}
          </AnimatePresence>

          {isHome && <HomePanel posts={posts} />}

          <div className="content-area">
            <AnimatePresence mode="wait">
              <ContentRouter />
            </AnimatePresence>
          </div>
        </div>
      </div>

      <MobileNav />
    </div>
  );
};

export default AppShell;
