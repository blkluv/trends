import { useMutation } from "@tanstack/react-query";
import { updateLikesOrDislikes } from "../services/apiTrends";

export const useMutateVotes = (id: number) => {
  return useMutation({
		mutationFn: (data: { value: number; type: 'likes' | 'dislikes' }) =>
			updateLikesOrDislikes({ id, value: data.value, type: data.type }),
	});
}
