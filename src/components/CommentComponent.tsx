import styled from "styled-components";
import { Comment } from "../interfaces/comment";
import { useTrendingStore } from "../store";
import moment from 'moment';
import { IStyledProps } from "../interfaces/cssComponentStyles";

interface Props{
  comment: Comment;
}
const CommentComponent = ({ comment }: Props) => {
  const theme = useTrendingStore(store => store.theme);
  const { author, content } = comment;
  return (<CommentStyles setting={theme}>
     <p className='content'>{ content }</p>
     <div className="author-and-date-container">
       <div className='author'>@{ author }<div className='date-created'>{moment(comment.created_at).format('MMMM Do YYYY, h:mm:ss a')}</div></div>
     </div>
  </CommentStyles>  );
}
 
export default CommentComponent;

//CSS Components
const CommentStyles = styled.div<IStyledProps>`
  display: flex;
  ${(props) =>
		props.setting === 'light'
			? 'border: 1px solid var(--color-pink-50)'
			: 'border: 1px solid var(--color-indigo-50)'};
  flex-direction: column;
  border-radius: 0.2rem;
  overflow: none;
 
 
  .author{
    ${(props) =>
		props.setting === 'light'
			? 'background-color: var(--color-pink-50)'
			: 'background-color: var(--color-indigo-50)'};
    color: var(--color-white-100);
    border-radius: 0 0 0.1rem 0.1rem;
    text-align: left;
    padding-left: 0.3rem;
    display: flex;
    justify-content: space-between;
  }

  .content{
    text-align: left;
    padding-left: 0.3rem;
    ${(props) =>
		props.setting === 'light'
			? 'color: var(--color-black-100)'
			: 'color: var(--color-white-100)'}
  }

  .date-created{
    padding-right: 0.3rem;
  }
`