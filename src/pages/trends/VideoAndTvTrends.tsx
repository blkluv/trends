import { useEffect } from "react";
import TrendsList from "../../components/TrendsList";
import { useTrendingStore } from "../../store";

const VideoAndTvTrends = () => {
  const setSortTrendsBy = useTrendingStore(store => store.setSortTrendsBy);
  useEffect(() => setSortTrendsBy('likesToDislikesRatio'));
  return ( <TrendsList trendType='video and tv'/> );
}
 
export default VideoAndTvTrends;