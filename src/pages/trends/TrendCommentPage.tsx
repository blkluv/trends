import { useLocation } from 'react-router-dom';
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

// ! Investigate why the comments icon is rendered out the number of times as there are posts when navigating to this page, but only when user is logged in. When not logged in, the comments are only rendered out once, as expected.
const TrendCommentPage = () => {
	const location = useLocation();
	const { author, created_at, title, content, image, likes, dislikes, id } =
		location.state;

	const theme = useTrendingStore((store) => store.theme);
	const username = useTrendingStore((store) => store.username);
	const authToken = useTrendingStore((store) => store.authToken);
	const { data: comments } = useComments();
	const filteredComments = comments?.filter(
		(comment) => comment['trend_id'] === id
	);

	const commentForm = authToken ? (
		<CommentForm username={username} id={id} />
	) : (
		<p className='login-message'>[Login to comment.]</p>
	);

	return (
		<TrendCommentPageStyles setting={theme}>
			<TrendStyles setting={theme} type={'trend-comment-page'}>
				<h1>{title}</h1>
				<div className='image'>
					<img src={image} width='300px' alt={title} />
				</div>
				<Vote likes={likes} dislikes={dislikes} id={id} />
				<Views increaseViewsCount={true} trendId={id} />
				<div className='details'>
					<p>
						<span className='bold'></span> {content}
					</p>
				</div>
				<div className='author-and-date-container'>
					<div className='author'>
						@{author}
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
const TrendCommentPageStyles = styled.div`
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

	.author-and-date-container {
		${(props) =>
			props.setting === 'light'
				? 'color: var(--color-black-100)'
				: 'color: var(--color-grey-50)'}
	}
`;
