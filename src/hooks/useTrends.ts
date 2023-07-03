import { useQuery } from "@tanstack/react-query";
import { getTrends } from "../services/apiTrends";

export const useTrends = () => {
 return useQuery({
  queryKey: ['trends'],
  queryFn: getTrends,
});
}