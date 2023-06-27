import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getComments } from "../services/apiComments";

export const useComments = () => {
  // const queryClient = useQueryClient();
  // queryClient.invalidateQueries(); // Forces a refetch from backend to get latest data

  return useQuery({
    queryKey: ['comments'],
    queryFn: getComments,
  });
}