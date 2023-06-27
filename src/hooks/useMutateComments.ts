import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createComment } from "../services/apiComments"
import { CommentData } from "../interfaces/comment"

export const useMutateComments = () => {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries(); // Forces a refetch from backend to get latest data
  
  return useMutation({
    mutationFn: (commentData: CommentData) => createComment(commentData),
  })
}