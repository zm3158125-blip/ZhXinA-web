import { createContext } from 'react';
import type { PostData } from '../utils/markdown';

export type AppView =
  | 'home'
  | 'archives'
  | 'friendly-links'
  | 'profile'
  | 'others'
  | 'post-detail'
  | 'article-detail';

export interface AppContextValue {
  activeView: AppView;
  previousView: AppView;
  selectedPost: PostData | null;
  activeArticle: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  navigate: (view: AppView) => void;
  openPost: (post: PostData) => void;
  openArticle: (articleId: string) => void;
  goBack: () => void;
  isHome: boolean;
}

export const AppContext = createContext<AppContextValue | null>(null);
