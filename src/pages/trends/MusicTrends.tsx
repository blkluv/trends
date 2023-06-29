import { useEffect } from 'react';
import TrendsList from '../../components/TrendsList';
import { useTrendingStore } from '../../store';

const MusicTrends = () => {
  const setFeaturedTrendsSortBy = useTrendingStore(store => store.setFeaturedTrendsSortBy);
  useEffect(() => setFeaturedTrendsSortBy('likesToDislikesRatio'));
	return <TrendsList trendType='music' />;
};

export default MusicTrends;
