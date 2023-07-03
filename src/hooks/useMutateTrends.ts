import { MutationFunction, useMutation, useQueryClient } from "@tanstack/react-query"
import { Trend  } from "../interfaces/trend";

export const useMutateTrends = (mutationFunction: MutationFunction) => {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries(); // Forces a refetch from backend to get latest data
  
  return useMutation({
    mutationFn: (trend: Trend) => mutationFunction(trend),
  });
}