import { create } from "zustand";
import { Comment } from "./interfaces/comment";
import { Trend } from "./interfaces/trend";
import { FeaturedSortByTypes } from "./types/FeaturedSortByTypes";


interface TrendingStore{
  theme: string; // theme type
  authToken: string; // logged in or not(no auth token)
  username: string; // current user
  comments: Comment[];
  trends: Trend[];
  featuredTrendsSortBy: FeaturedSortByTypes;
  navLinks: {[key: string]: string}; // header and sidebar
  language: 'japanese' | 'english';
  toggleTheme: () => void;
  setAuthToken: (authToken: string) => void; 
  setUsername: (username: string) => void;
  getTheme: () => string;
  setComments: (comments: Comment[]) => void;
  setTrends: (trends: Trend[]) => void;
  setFeaturedTrendsSortBy: (featuredTrendsSortBy: FeaturedSortByTypes) => void;
  toggleLanguage: () => void;
}

export const useTrendingStore = create<TrendingStore>( (set): any => {
  return {
    theme: 'dark', 
    authToken: '', 
    username: '', 
    comments: [], 
    trends: [], 
    featuredTrendsSortBy: '',
    navLinks: {
        english: {
          logo: 'Trending',
          clothing: 'Clothing', music: 'Music', movies: 'Movies', videoAndTv: 'Video & TV', technology: 'Technology', create: 'Create', settings: 'Settings', login: 'Login', logout: 'Logout'
        }, 
        japanese: { 
          clothing: '服装', music: '音楽', movies: '映画', videoAndTv: 'ビデオとテレビ', technology: '技術', create: '投稿', settings: '設定', login: 'ログイン', logo: 'トレーディング', logout: 'ログアウト'
        }
      },
      language: 'english',

    toggleTheme: () => set((store) => ({...store, theme: store.theme === 'light' ? 'dark' : 'light'})),
    setAuthToken: (newAuthToken: string) => set((store) => ({...store, authToken: newAuthToken})),
    setUsername: (name: string) => set((store) => ({...store, username: name})),
    setComments: (comments: Comment[]) => set( (store) => ({...store, comments})),
    setTrends: (trends: Trend[]) => set((store) => ({...store, trends})),
    setFeaturedTrendsSortBy: (featuredTrendsSortBy: FeaturedSortByTypes) => 
      set((store) => ({...store, featuredTrendsSortBy})),
    toggleLanguage: () => set(store => ({...store, language: store.language === 'english' ? 'japanese' : 'english'})),
   
  }
});