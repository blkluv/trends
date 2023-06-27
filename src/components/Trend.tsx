import styled from 'styled-components';
import { useTrendingStore } from '../store';
import { useNavigate } from 'react-router-dom';
import Vote from './Vote';
import moment from 'moment';
import Views from './Views';
import CommentsIcon from './CommentsIcon';
import { useComments } from '../hooks/useComments';

interface Props {
	// trend
	id: number;
	author: string;
	created_at: Date;
	alt: string;
	content: string;
	image: string;
	likes: number;
	dislikes: number;
}

const Trend = ({
	author,
	created_at,
	alt: title,
	content,
	image,
	likes,
	dislikes,
	id,
}: Props) => {
	const navigate = useNavigate();
	const theme = useTrendingStore((store) => store.theme);
	const { data: comments } = useComments();

	const navigateToComments = () => {
		navigate('/trend-comment-page', {
			state: {
				author,
				created_at,
				title,
				content,
				image,
				likes,
				dislikes,
				id,
			},
		});
	};

	return (
		<TrendStyles
			setting={theme}
			trendWidth={'14rem'}
			trendMaxHeight={'22rem'}
			margin={'auto'}
			imageMaxWidth={'11rem'}
			imageMaxHeight={'8rem'}>
			<h1>{title}</h1>

			<div className='image'>
				<img src={image} onClick={navigateToComments} alt={title} />
			</div>
			<Vote likes={likes} dislikes={dislikes} id={id} />

			<div className='details'>
				<p>
					<span className='bold'></span>{' '}
					{content.length <= 50 ? content : content.slice(0, 50) + '...'}
				</p>
			</div>
			<div className='author-and-date-container'>
				<div className='author'>
					@{author}
					<div className='date-created'>
						{moment(created_at).format('MMMM Do YYYY, h:mm:ss a')}
					</div>
				</div>
				<div className='comments-and-views' onClick={navigateToComments}>
					<span className='comments-icon'>
						<CommentsIcon comments={comments} id={id} />
					</span>
					<span className='views'>
						<Views trendId={id} />
					</span>
				</div>
			</div>
		</TrendStyles>
	);
};

export default Trend;

// CSS Components
export const TrendStyles = styled.div`
	${(props) =>
		props.setting === 'light'
			? 'box-shadow: 0.1px 0.1px 4px 0.1px var(--color-pink-50)'
			: 'box-shadow: 0.1px 0.1px 4px 0.1px var(--color-white-100)'};
	${(props) =>
		props.setting === 'light'
			? 'background-color: var(--color-white-100)'
			: 'background-color: var(--color-black-75)'};
	${(props) => 'width: ' + props.trendWidth};
	${(props) => 'max-height: ' + props.trendMaxHeight};
	padding: 0.5rem;
	margin-bottom: 0.5rem;
	border-radius: 0.1rem;
	font-size: 0.9rem;
	text-align: center;
	gap: 0.2rem;
	border-radius: 0.2rem;

	img {
		padding: 0.2rem;
		padding-bottom: 2rem;
		box-shadow: 0.1px 0.1px 1px 0.1px var(--color-grey-500);
		transition: all 0.3s ease-in;
		background-color: var(--color-white-100);
		${(props) => 'max-width: ' + props.imageMaxWidth};
		${(props) => 'max-height: ' + props.imageMaxHeight};
	}

	img:hover {
		transform: scale(1.05);
		cursor: pointer;
		@media only screen and (max-width: 600px) {
			transform: scale(1);
			margin: inherit;
			cursor: inherit;
		}
	}

	h1 {
		font-size: 1.45rem;
		${(props) =>
			props.setting === 'light'
				? 'color: var(--color-black-100)'
				: 'color: var(--color-grey-100)'};
	}

	.comments-and-views {
		display: flex;
		justify-content: space-between;
	}

	.details {
		background-color: var(--color-grey-50);
		margin: auto;
		border-radius: 0.15rem 0.15rem 0 0;
		text-align: left;
		box-shadow: 0.1px 0.1px 1px 0.1px var(--color-grey-100);
		padding: 0.2rem;

		.button-container {
			display: flex;
			justify-content: space-around;
			flex-direction: row;
		}
	}

	.bold {
		font-weight: 600;
	}

	.author {
		background-color: var(--color-grey-100);
		color: var(--color-white-100);
		font-size: 0.4rem;
		text-align: left;
		padding: 0 0.15rem;
		display: flex;
		justify-content: space-between;
		border-radius: 0 0 0.15rem 0.15rem;
	}
`;
