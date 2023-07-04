import { MutationFunction, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTrendingStore } from "../store";
import { Trend, TrendData  } from "../interfaces/trend";

export const useMutateTrends = (mtnFn: any) => {
  const queryClient = useQueryClient();
  const setTrends = useTrendingStore(store => store.setTrends);
  const storeTrends = useTrendingStore(store => store.trends);
  // queryClient.invalidateQueries(); // Forces a refetch from backend to get latest data
  
  return useMutation({ // ! Need to update the trendingStore upon mutation and use it as the main state for trends shown on site.
    mutationFn: (trend: (TrendData | Trend)) => 
      mtnFn(trend),
    onSuccess: ( (savedTrend, newTrend) => {
      console.log('useMutateTrends()', storeTrends, savedTrend, newTrend);
      // setTrends([...trends, savedTrend]); // ! Causing undefined id error 
      queryClient.setQueryData<Trend[]>(['trends'], (trends) => {
        [savedTrend, ...(trends || [])];
      })
    } )
  });
}