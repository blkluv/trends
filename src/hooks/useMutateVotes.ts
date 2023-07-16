import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLikesOrDislikes } from "../services/apiTrends";
import { Trend } from "../interfaces/trend";

export const useMutateVotes = (id: number) => {
  const queryClient = useQueryClient();
  

  return useMutation({
		mutationFn: (data: { value: number; type: 'likes' | 'dislikes' }) =>
			updateLikesOrDislikes({ id, value: data.value, type: data.type }),
      onSuccess: (trend: Trend) => {
        const { likes, dislikes} = trend;
        queryClient.invalidateQueries({queryKey: ['trends']});
        queryClient.setQueryData(['votes'], () => {
          return {id: trend.id, title: trend.alt, likes, dislikes};
        })
      }
	});
}