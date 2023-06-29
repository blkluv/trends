import { useEffect } from 'react';
import TrendsList from '../../components/TrendsList';
import { useTrendingStore } from '../../store';

const TechnologyTrends = () => {
  const setSortTrendsBy = useTrendingStore(store => store.setSortTrendsBy);
  useEffect(() => setSortTrendsBy('likesToDislikesRatio'));
	return <TrendsList trendType='technology' />;
};

export default TechnologyTrends;
