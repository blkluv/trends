import { useEffect } from 'react';
import TrendsList from '../../components/TrendsList';
import { useTrendingStore } from '../../store';

const ClothingTrends = () => {
  const setSortTrendsBy = useTrendingStore(store => store.setSortTrendsBy);
  useEffect(() => setSortTrendsBy('likesToDislikesRatio'), []);
 
	return (
		<div>
			<TrendsList trendType='clothing'/>
		</div>
	);
};

export default ClothingTrends;

// Without reactQuery
// const [trends, setTrends] = useState<Trend[]>([]);

// useEffect(() => {
// 	getTrends().then((trendsData) => {
// 		return setTrends(trendsData);
// 	});
// }, []);
