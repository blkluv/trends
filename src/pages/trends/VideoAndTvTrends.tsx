import { useEffect } from "react";
import TrendsList from "../../components/TrendsList";
import { useTrendingStore } from "../../store";

const VideoAndTvTrends = () => {
  const setFeaturedTrendsSortBy = useTrendingStore(store => store.setSortTrendsBy);
  useEffect(() => setFeaturedTrendsSortBy('likesToDislikesRatio'));
  return ( <TrendsList trendType='video and tv'/> );
}
 
export default VideoAndTvTrends;