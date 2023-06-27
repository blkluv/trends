import { FaRegComments } from 'react-icons/fa';
import { totalTrendComments } from '../utility/helpers';
import styled from 'styled-components';
import { Comment } from '../interfaces/comment';

interface Props {
	id: number;
	comments?: Comment[] | any;
}
const CommentsIcon = ({ id, comments }: Props) => {
	// console.log('comments: ', comments);

	return (
		<CommentsIconStyles>
			<FaRegComments title='comments' />
			{!comments || comments?.length === 0
				? '0'
				: totalTrendComments(id, comments)}
		</CommentsIconStyles>
	);
};

export default CommentsIcon;

// CSS Components
const CommentsIconStyles = styled.div`
	margin: 0rem;
	padding: 0 0.1rem;
	border-radius: 0.6rem;
	font-size: 1rem;
	transition: all 0.3s;
	color: var(--color-pink-50);
	display: inline-block;

	&:hover {
		cursor: pointer;
		transform: scale(1.1);
		color: var(--color-pink-100);
	}
`;
