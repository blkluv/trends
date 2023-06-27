import { Comment } from "../interfaces/comment";
import CommentComponent from "./CommentComponent";


interface Props{
  filterKey: 'trend_id' | 'author'; // id for matching with a specific trend, or author-user can see comments
  filterValue: number | string; // 'luke', '
  comments: Comment[];
}
const CommentsList = ({ comments }: Props) => {
  const sortedComments = comments?.sort((a: Comment,b: Comment) => b.id - a.id);
  
  return ( sortedComments?.map((comment: Comment) => (<div key={comment.id}>
    <CommentComponent comment={comment} />
  </div>)) );
}
 
export default CommentsList;