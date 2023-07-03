import { useQuery } from "@tanstack/react-query";
import { getLikesAndDislikes } from "../services/apiTrends";

export const useVotes = (id: number) => {
  // const queryClient = useQueryClient();
  // queryClient.invalidateQueries(); // Forces a refetch from backend to get latest data

  return useQuery({
    queryKey: ['votes'],
    queryFn: () => getLikesAndDislikes(id),
  });
}