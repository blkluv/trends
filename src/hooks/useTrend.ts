import { useQuery } from "@tanstack/react-query";
import { getTrend} from "../services/apiTrends";

export const useTrend = (trendId: number) => {
  // const queryClient = useQueryClient();
  // queryClient.invalidateQueries(); // Forces a refetch from backend to get latest data

  return useQuery({
    queryKey: ['trend'],
    queryFn: () => getTrend(trendId),
  });
}