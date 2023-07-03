import { create } from 'zustand';
import { Comment } from './interfaces/comment';
import { Trend } from './interfaces/trend';
import { SortTrendsBy } from './types/sortTrendsBy';

interface TrendingStore {
	theme: string; // theme type
	authToken: string; // logged in or not(no auth token)
	username: string; // current user
  user_id: string;// necessary for auth check on backend when deleting
	comments: Comment[];
	trends: Trend[];
	sortTrendsBy: SortTrendsBy;
	language: 'japanese' | 'english';
	toggleTheme: () => void;
	setAuthToken: (authToken: string) => void;
  setUserId: (user_id: string) => void;
	setUsername: (username: string) => void;
	setComments: (comments: Comment[]) => void;
	setTrends: (trends: Trend[]) => void;
  // deleteTrend: (id: number) => void;
	setSortTrendsBy: (sortTrendsBy: SortTrendsBy) => void;
	toggleLanguage: () => void;
}

export const useTrendingStore = create<TrendingStore>((set): any => {
	return {
		theme: 'dark',
		authToken: '',
		username: '',
    user_id: '',
		comments: [],
		trends: [],
		sortTrendsBy: '',
		language: 'english',

		toggleTheme: () =>
			set((store) => ({
				...store,
				theme: store.theme === 'light' ? 'dark' : 'light',
			})),
		setAuthToken: (newAuthToken: string) =>
			set((store) => ({ ...store, authToken: newAuthToken })),
		setUsername: (name: string) =>
			set((store) => ({ ...store, username: name })),
		setUserId: (user_id: string) =>
			set((store) => ({ ...store, user_id })),
		setComments: (comments: Comment[]) =>
			set((store) => ({ ...store, comments })),
		setTrends: (trends: Trend[]) => set((store) => ({ ...store, trends })),
    // deleteTrend: (idToDelete: number) => set((store) => ({...store.trends.filter(trend => trend.id !== idToDelete)})),
		setSortTrendsBy: (sortTrendsBy: SortTrendsBy) =>
			set((store) => ({ ...store, sortTrendsBy })),
		toggleLanguage: () =>
			set((store) => ({
				...store,
				language: store.language === 'english' ? 'japanese' : 'english',
			})),
	};
});
