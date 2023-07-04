import { useQuery  } from "@tanstack/react-query";
import { getTrend} from "../services/apiTrends";

export const useTrend = (trendId: number) => {
  return useQuery({
    queryKey: ['trend'],
    queryFn: () => getTrend(trendId),
  });
}