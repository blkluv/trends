import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createComment } from "../services/apiComments"
import { CommentData, Comment } from "../interfaces/comment"
import { useTrendingStore } from "../store";

export const useMutateCreateComment = () => {
  const queryClient = useQueryClient();
  const [prevStoredComments, setComments] = useTrendingStore(store => [store.comments, store.setComments]);
  
  return useMutation<Comment, Error, CommentData>({
    mutationFn: (commentData: CommentData) => createComment(commentData),
    onSuccess: ( (savedComment: Comment) => {
      setComments([savedComment, ...prevStoredComments]);// store
      queryClient.setQueryData<CommentData[]>(['comments'], (comments) => {
        return [savedComment, ...(comments || [])]; // cache
      })
    } )
  })
}