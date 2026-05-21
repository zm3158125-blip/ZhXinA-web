import React, { useCallback, useMemo, useState } from 'react';
import type { PostData } from '../utils/markdown';
import { AppContext, type AppView } from './appContext';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<AppView>('home');
  const [previousView, setPreviousView] = useState<AppView>('home');
  const [selectedPost, setSelectedPost] = useState<PostData | null>(null);
  const [activeArticle, setActiveArticle] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useCallback((view: AppView) => {
    setActiveView(view);
    setActiveArticle(null);
    if (view !== 'post-detail') setSelectedPost(null);
  }, []);

  const openPost = useCallback(
    (post: PostData) => {
      setPreviousView(activeView);
      setSelectedPost(post);
      setActiveView('post-detail');
    },
    [activeView]
  );

  const openArticle = useCallback(
    (articleId: string) => {
      setPreviousView(activeView);
      setActiveArticle(articleId);
      setActiveView('article-detail');
    },
    [activeView]
  );

  const goBack = useCallback(() => {
    navigate(previousView);
  }, [navigate, previousView]);

  const value = useMemo(
    () => ({
      activeView,
      previousView,
      selectedPost,
      activeArticle,
      searchQuery,
      setSearchQuery,
      navigate,
      openPost,
      openArticle,
      goBack,
      isHome: activeView === 'home',
    }),
    [
      activeView,
      previousView,
      selectedPost,
      activeArticle,
      searchQuery,
      navigate,
      openPost,
      openArticle,
      goBack,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
