import { useMutation } from "@tanstack/react-query";
import { updateViewCount } from "../services/apiTrends";

export const useMutateViews = (value: number, id: number) => {
  return useMutation({
		mutationFn: () =>
			updateViewCount(value, id),
      onSuccess: ( () => true),
	});
}

