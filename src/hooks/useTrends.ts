import { useQuery } from "@tanstack/react-query";
import { getTrends } from "../services/apiTrends";

export const useTrends = () => {
  //  const queryClient = useQueryClient();
  // queryClient.invalidateQueries(); // Forces a refetch from backend to get latest data

 return useQuery({
  queryKey: ['trends'],
  queryFn: getTrends,
});
}