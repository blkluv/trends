import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { TrendStyles } from '../../components/Trend';
import styled from 'styled-components';
import { useTrendingStore } from '../../store';
import CommentsList from '../../components/CommentsList';
import { useComments } from '../../hooks/useComments';
import CommentForm from '../../components/CommentForm';
import Vote from '../../components/Vote';
import moment from 'moment';
import Views from '../../components/Views';
import CommentsIcon from '../../components/CommentsIcon';
import { IStyledProps } from '../../interfaces/cssComponentStyles';
import Icon from '../../components/Icon';

const TrendCommentPage = () => {
	const location = useLocation();
  const navigate = useNavigate();
	const { author, user_id, created_at, title, content, image, likes, dislikes, id } =
		location.state;

	const theme = useTrendingStore((store) => store.theme);
	const username = useTrendingStore((store) => store.username);
	const authToken = useTrendingStore((store) => store.authToken);
	const { data: comments } = useComments();
	const filteredComments: any = comments?.filter(
		(comment: any) => comment['trend_id'] === id
	);

	const commentForm = authToken ? (
		<CommentForm username={username} id={id} />
	) : (
		<p className='login-message'>
			[{<NavLink to='/auth'>Login</NavLink>} to comment.]
		</p>
	);

  const createPrivateMessage = () => {
    navigate('/create-private-message', {
			state: {
				author,
        user_id, // author's user_id
        title,
			},
		})
  }

	return (
		<TrendCommentPageStyles setting={theme}>
			<TrendStyles setting={theme}>
				<h1>{title}</h1>
				<div className='image'>
					<img src={image} width='300px' alt={title} />
				</div>
				<Vote likes={likes} dislikes={dislikes} id={id} />
				<div className='views-and-message'>
					<span
						className='message'
            title='private message'
						onClick={createPrivateMessage}
            >
						<Icon fontSize='1rem' icon='mail' />
					</span>
					<Views increaseViewsCount={true} trendId={id} />
				</div>
				<div className='details'>
					<p>
						<span className='bold'></span> {content}
					</p>
				</div>
				<div className='author-date-message-container'>
					<div className='author'>
						<span className='author-and-message'>@{author}</span>
						<div className='date-created'>
							{moment(created_at).format('MMMM Do YYYY, h:mm:ss a')}
						</div>
					</div>
					<div className='comments-container'>{commentForm}</div>
				</div>
				<h3 className='comments-heading'>
					{!comments || filteredComments?.length === 0 ? (
						'No comments yet. How about you leave one?'
					) : (
						<span className='comments-icon'>
							<CommentsIcon comments={filteredComments} id={id} />
						</span>
					)}
				</h3>
				<div className='comments'>
					<CommentsList
						comments={filteredComments}
						filterKey='trend_id'
						filterValue={id}
					/>
				</div>
			</TrendStyles>
		</TrendCommentPageStyles>
	);
};

export default TrendCommentPage;

// CSS-Components
const TrendCommentPageStyles = styled.div<IStyledProps>`
	h2 {
		text-align: center;
	}

	.login-message {
		text-align: center;
		font-size: 0.7rem;
		font-style: italic;
	}
	.comments {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.comments-heading {
		${(props) =>
			props.setting === 'light'
				? 'color: var(--color-pink-50)'
				: 'color: var(--color-indigo-50)'}
	}

	.author-date-message-container {
		${(props) =>
			props.setting === 'light'
				? 'color: var(--color-black-100)'
				: 'color: var(--color-grey-50)'}
	}

	.message {
		margin-bottom: 0.1rem;
    color: var(--color-light-blue-50);
		cursor: pointer;
    transition: all 0.3s;
    
    &:hover{
      transform: scale(1.1);
      color: var(--color-light-blue-100);
    }
	}

	.views-and-message {
		display: flex;
		justify-content: space-between;
		align-items: end;
	}
`;
