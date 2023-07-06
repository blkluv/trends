import { getComments } from "./services/apiComments";
import { getTrends } from "./services/apiTrends";
import { useTrendingStore } from "./store";

export const useInitStore = () => {
  // initialize comments in TrendingStore
	const setComments = useTrendingStore((store) => store.setComments);
	getComments().then((comments: any) => setComments(comments));
  // initialize trends in TrendingStore
  const setTrends = useTrendingStore( store => store.setTrends);
  getTrends().then(trends => setTrends(trends));
}