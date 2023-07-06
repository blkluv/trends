import { useQuery } from "@tanstack/react-query";
import { getComments } from "../services/apiComments";

export const useComments = () => {
  return useQuery({
    queryKey: ['comments'],
    queryFn: getComments,
  });
}