import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateComment } from "../services/apiComments"
import { CommentData, Comment } from "../interfaces/comment"
import { useTrendingStore } from "../store";

export const useMutateUpdateComment = () => {
  const queryClient = useQueryClient();
  const [prevStoredComments, setComments] = useTrendingStore(store => [store.comments, store.setComments]);
  
  return useMutation<Comment, Error, CommentData>({
    mutationFn: (commentData: CommentData) => updateComment(commentData),
    onSuccess: ( (savedComment: Comment) => {
      const filteredComments = prevStoredComments.filter(comment => comment.id !== savedComment.id); // needed for update case
      setComments([savedComment, ...filteredComments]);// store
      queryClient.setQueryData<CommentData[]>(['comments'], () => {
        return [savedComment, ...(filteredComments || [])]; // cache
      })
    } )
  })
}