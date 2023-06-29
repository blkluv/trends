import { useEffect } from 'react';
import TrendsList from '../../components/TrendsList';
import { useTrendingStore } from '../../store';

const TechnologyTrends = () => {
  const setFeaturedTrendsSortBy = useTrendingStore(store => store.setSortTrendsBy);
  useEffect(() => setFeaturedTrendsSortBy('likesToDislikesRatio'));
	return <TrendsList trendType='technology' />;
};

export default TechnologyTrends;
