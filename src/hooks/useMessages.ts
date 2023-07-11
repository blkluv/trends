import { useQuery } from "@tanstack/react-query";
import { getMessages } from "../services/apiMessages";

export const useMessages = () => {
  return useQuery({
    queryKey: ['messages'],
    queryFn: getMessages,
  });
}