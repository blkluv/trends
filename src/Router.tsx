import { GlobalStyles } from './GlobalStyles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import PageNotFound from './pages/PageNotFound';
import MovieTrends from './pages/trends/MovieTrends';
import FeaturedTrends from './pages/trends/FeaturedTrends';
import ClothingTrends from './pages/trends/ClothingTrends';
import SuggestTrendCategory from './pages/trends/SuggestTrendCategory';
import CreateTrend from './pages/trends/CreateTrend';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import MusicTrends from './pages/trends/MusicTrends';
import TechnologyTrends from './pages/trends/TechnologyTrends';
import Settings from './pages/Settings';
import Auth from './pages/Auth';
import Logout from './pages/Logout';
import TrendCommentPage from './pages/trends/TrendCommentPage';
import VideoAndTvTrends from './pages/trends/VideoAndTvTrends';
import UserDashboard from './pages/UserDashboard';
import SiteStats from './pages/SiteStats';
import PrivateMessage from './pages/PrivateMessage';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 0,
		},
	},
});

const Router = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			<GlobalStyles />
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<AppLayout />}>
						<Route path='/' element={<FeaturedTrends />}></Route>
						<Route path='trends' element={<FeaturedTrends />}></Route>
						<Route path='create-trend' element={<CreateTrend />}></Route>
						<Route path='clothing-trends' element={<ClothingTrends />}></Route>
						<Route path='movies-trends' element={<MovieTrends />}></Route>
						<Route path='video-and-tv-trends' element={<VideoAndTvTrends />}></Route>
						<Route path='music-trends' element={<MusicTrends />}></Route>
						<Route
							path='technology-trends'
							element={<TechnologyTrends />}></Route>
						<Route
							path='trend-comment-page'
							element={<TrendCommentPage />}></Route>
						<Route path='settings' element={<Settings />}></Route>
						<Route path='site-stats' element={<SiteStats />}></Route>
						<Route path='auth' element={<Auth />}></Route>
						<Route path='logout' element={<Logout />}></Route>
            <Route path="user-dashboard" element={<UserDashboard/>}></Route>
            <Route path="private-message" element={<PrivateMessage/>}></Route>
						<Route
							path='suggest-trend-category'
							element={<SuggestTrendCategory />}></Route>
						<Route path='*' element={<PageNotFound />} />
					</Route>
				</Routes>
			</BrowserRouter>
			<Toaster
				position='top-left'
				reverseOrder={true}
				toastOptions={{
					success: { duration: 3000 },
					error: { duration: 6000 },
				}}
			/>
		</QueryClientProvider>
	);
};

export default Router;
