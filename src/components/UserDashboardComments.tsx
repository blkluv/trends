import moment from 'moment';
import { useTrendingStore } from '../store';
import { filterCommentsByUser } from '../utility/filters';
import { useState } from 'react';
import { deleteComment } from '../services/apiComments';
import toast from 'react-hot-toast';
import Icon from './Icon';
import Modal from './Modal';
import DashboardCommentForm from './DashboardCommentForm';
import styled from 'styled-components';

const UserDashboardComments = () => {
	const [username, storedComments, setComments] = useTrendingStore((store) => [
		store.username,
		store.comments,
		store.setComments,
	]);
	const [showCommentForm, setShowCommentForm] = useState<number | null>(null);
	const usersComments = filterCommentsByUser(username, storedComments);

	const onDeleteComment = async (commentId: number) => {
		if (!confirm('Are you sure you want to delete this comment?')) return;

		try {
			const result = await deleteComment(commentId);
			if (!result) return toast.error('Something went wrong...');
		} catch (err: any) {
			toast.error(err.message);
		}

		setComments(storedComments?.filter((comment) => comment.id !== commentId));
	};

	const closeModal = () => {
		setShowCommentForm(null);
		return showCommentForm;
	};

  if (usersComments?.length === 0)
		return (
			<p className='no-trends-message'>
				You haven't made any comments yet. Try leaving one on a trend.
			</p>
		);

	return (
		<UserDashboardCommentsStyles>
			<h2>{username}'s Comments</h2>
			{usersComments.map((comment) => (
				<div className='comment-info-container'>
					<div className='comment-info'>
						<div className='trend'>Trend: {comment.trend_title}</div>
						<div className='comment'>Comment: {comment.content}</div>
						<div className='date-created'>
							Date:{' '}
							{moment(comment.created_at).format('MMMM Do YYYY, h:mm:ss a')}
						</div>
					</div>
					<div className='buttons'>
						<button
							className='edit'
							onClick={() =>
								setShowCommentForm(
									comment.id === showCommentForm ? null : comment.id
								)
							}>
							<Icon icon='edit' />
						</button>
						<button
							className='delete'
							onClick={() => onDeleteComment(comment.id)}>
							<Icon icon='delete' />
						</button>
					</div>
					{showCommentForm === comment.id && (
						<Modal maxHeight={'40vh'} onCloseModal={() => closeModal()}>
							<DashboardCommentForm
								initialFormFields={{ id: comment.id, comment: comment.content }}
								username={username}
								trendId={comment.trend_id}
							/>
						</Modal>
					)}
				</div>
			))}
		</UserDashboardCommentsStyles>
	);
};

export default UserDashboardComments;

// CSS Components
const UserDashboardCommentsStyles = styled.div`
.trend, .comment{
  font-size: 0.8rem;
}

.date-created{
  font-size: 0.4rem;
}
	@media only screen and (max-width: 500px) {
		.trend,
		.comment,
		.date-created {
			font-size: 0.1rem;
		}
	}
`;
