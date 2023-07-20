import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTrendingStore } from "../store";
import { Trend, TrendData  } from "../interfaces/trend";

// !! split this into useMutateCreateTrend and useMutateUpdateTrend for better debugging and readability
export const useMutateTrends = (mtnFn: any) => {
  const queryClient = useQueryClient();

  const [setTrends, prevStoredTrends] = useTrendingStore(store => [store.setTrends, store.trends]);
  return useMutation({ // either createTrend(trend) or updateTrend(trend, trendId) will be the mtnFn
    mutationFn: (trend: (TrendData | Trend), trendId?: number) => mtnFn(trend, trendId),
    onSuccess: ( (savedTrend: Trend) => {
      const filteredTrends = prevStoredTrends.filter(trend => trend.id !== savedTrend.id); // needed for update case
      setTrends([savedTrend, ...filteredTrends]);
      queryClient.invalidateQueries({queryKey: ['trends']});
      queryClient.setQueryData<Trend[]>(['trends'], () => {
        return [savedTrend, ...(filteredTrends || [])];
      });
    } )
  });
}