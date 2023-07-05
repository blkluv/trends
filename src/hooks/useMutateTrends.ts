import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTrendingStore } from "../store";
import { Trend, TrendData  } from "../interfaces/trend";

export const useMutateTrends = (mtnFn: any) => {
  const queryClient = useQueryClient();
  const [setTrends, prevStoredTrends] = useTrendingStore(store => [store.setTrends, store.trends]);
  
  return useMutation({
    mutationFn: (trend: (TrendData | Trend)) => 
      mtnFn(trend),
    onSuccess: ( (savedTrend: Trend) => {
      setTrends([savedTrend, ...prevStoredTrends]);
      queryClient.setQueryData<Trend[]>(['trends'], (trends) => {
        return [savedTrend, ...(trends || [])];
      })
    } )
  });
}