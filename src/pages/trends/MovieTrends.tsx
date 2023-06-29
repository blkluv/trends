import { useEffect } from 'react';
import TrendsList from '../../components/TrendsList';
import { useTrendingStore } from '../../store';

const MovieTrends = () => {
  const setFeaturedTrendsSortBy = useTrendingStore(store => store.setSortTrendsBy);
  useEffect(() => setFeaturedTrendsSortBy('likesToDislikesRatio'));
	return <TrendsList trendType='movies' />;
};

export default MovieTrends;
