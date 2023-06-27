import { create } from "zustand";
import { Comment } from "./interfaces/comment";
import { Trend } from "./interfaces/trend";

interface TrendingStore{
  theme: string; // theme type
  authToken: string; // logged in or not(no auth token)
  username: string; // current user
  comments: Comment[],
  trends: Trend[],
  navLinks: {[key: string]: string}, // header and sidebar
  language: 'japanese' | 'english',
  toggleTheme: () => void;
  setAuthToken: (authToken: string) => void; 
  setUsername: (username: string) => void;
  getTheme: () => string;
  setComments: (comments: Comment[]) => void;
  setTrends: (trends: Trend[]) => void;
  toggleLanguage: () => void;
}

export const useTrendingStore = create<TrendingStore>( (set, get) => {
  return {
    theme: 'dark', 
    authToken: '', 
    username: '', 
    comments: [], 
    trends: [], 
    navLinks: {
        english: {
          logo: 'Trending',
          clothing: 'clothing', music: 'music', movies: 'movies', technology: 'technology', create: 'create', settings: 'settings', login: 'login', logout: 'logout'
        }, 
        japanese: { 
          clothing: '服装', music: '音楽', movies: '映画', technology: '技術', create: '投稿', settings: '設定', login: 'ログイン', logo: 'トレーディング', logout: 'ログアウト'
        }
      },
      language: 'english',

    toggleTheme: () => set((store) => ({...store, theme: store.theme === 'light' ? 'dark' : 'light'})),
    setAuthToken: (newAuthToken: string) => set((store) => ({...store, authToken: newAuthToken})),
    setUsername: (name: string) => set((store) => ({...store, username: name})),
    setComments: (comments: Comment[]) => set( (store) => ({...store, comments})),
    setTrends: (trends: Trend[]) => set((store) => ({...store, trends})),
    toggleLanguage: () => set(store => ({...store, language: store.language === 'english' ? 'japanese' : 'english'})),
    action: () => {
      const theme = get().theme;
      const authToken = get().authToken;
      const username = get().username;
      const comments = get().comments;
      const trends = get().trends;
      const navLinks = get().navLinks;
      const language = get().language;
    }
  }
});