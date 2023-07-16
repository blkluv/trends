import { useQuery } from "@tanstack/react-query";
import { getLikesAndDislikes } from "../services/apiTrends";

export const useVote = (id: number) => {
  return useQuery({
    queryKey: ['votes', id],
    queryFn: () => getLikesAndDislikes(id),
  });
}