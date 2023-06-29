import { useEffect } from 'react';
import TrendsList from '../../components/TrendsList';
import { useTrendingStore } from '../../store';

const MusicTrends = () => {
  const setSortTrendsBy = useTrendingStore(store => store.setSortTrendsBy);
  useEffect(() => setSortTrendsBy('likesToDislikesRatio'),[]);
	return <TrendsList trendType='music' />;
};

export default MusicTrends;
