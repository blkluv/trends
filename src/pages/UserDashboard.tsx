import styled from 'styled-components';
import { useTrendingStore } from '../store';
import {
	filterCommentsByUser,
	filterTrendsByKeyValue,
} from '../utility/filters';
import moment from 'moment';
import { deleteTrend } from '../services/apiTrends';
import { useState } from 'react';
import { Trend } from '../interfaces/trend';
import Modal from '../components/Modal';
import TrendForm from '../components/TrendForm';
import Icon from '../components/Icon';
import { NavLink, useNavigate } from 'react-router-dom';
import DashboardCommentForm from '../components/DashboardCommentForm';
import { deleteComment } from '../services/apiComments';
import toast from 'react-hot-toast';

// !Split this into several components and add different returns for if no trends, no comments, neither of the two etc.
const UserDashboard = () => {
	const [
		username,
		user_id,
		storedTrends,
		setTrends,
		storedComments,
    setComments,
		authToken,
	] = useTrendingStore((store) => [
		store.username,
		store.user_id,
		store.trends,
		store.setTrends,
		store.comments,
    store.setComments,
		store.authToken,
	]);
	const [showTrendForm, setShowTrendForm] = useState<number | null>(null);
	const [showCommentForm, setShowCommentForm] = useState<number | null>(null);
	const usersTrends = filterTrendsByKeyValue('user_id', user_id, storedTrends);
	const usersComments = filterCommentsByUser(username, storedComments);
  const navigate = useNavigate();

	const onDeleteTrend = async (trend: Trend) => {
		if (!confirm('Are you sure you want to delete this trend?')) return;

    try{
		const result = await deleteTrend(trend.id); // delete in db
    if(!result)
      return toast.error('Something went wrong...');
    } catch(err: any){
      toast.error(err.message);
    }
		setTrends(
			storedTrends?.filter((storedTrend) => storedTrend.id !== trend.id)
		); // delete in store
	};

  const onDeleteComment = async(commentId: number) => {
    if(!confirm('Are you sure you want to delete this comment?')) return;

    try{
    const result = await deleteComment(commentId);
    if(!result)
      return toast.error('Something went wrong...');
    } catch(err: any){
      toast.error(err.message);
    }

    setComments(storedComments?.filter(comment => comment.id !== commentId));
  }

	const closeModal = (modalType: 'trend-modal' | 'comment-modal') => {
		if (modalType === 'trend-modal') {
			setShowTrendForm(null);
			return showTrendForm;
		}
		// else comment-modal
		setShowCommentForm(null);
		return showCommentForm;
	};

	if (!authToken)
		return (
			<p>
				Please <NavLink to='/auth'>login</NavLink> to access your dashboard
			</p>
		);

	if (usersTrends?.length === 0)
		return (
			<p className='no-trends-message'>
				It looks like you haven't made any trends yet. You can make one{' '}
				<NavLink to='/create-trend'>here</NavLink>.
			</p>
		);

	return (
		<UserDashboardStyles>
			<>
      <div className="private-messages-container">
        <div className='private-messages' onClick={() => navigate('/private-messages')}><Icon icon='mailForward'/>Messages</div>
      </div>
				<h2>{username}'s Trends</h2>
				{usersTrends.map((trend) => (
					<div className='trend-info-container'>
						<div className='trend-info'>
							<div className='title'>Title: {trend.alt}</div>
							<p className='description'>
								Content: {trend.content.slice(0, 30)}...
							</p>
							<div className='date-created'>
								Date:{' '}
								{moment(trend.created_at).format('MMMM Do YYYY, h:mm:ss a')}
							</div>
						</div>
						<div className="buttons">
							<button
								className='edit'
								title='edit'
								onClick={() =>
									setShowTrendForm(showTrendForm === trend.id ? null : trend.id)
								}>
								<Icon icon='edit' />
							</button>
							<button
								className='delete'
								title='delete'
								onClick={() => onDeleteTrend(trend)}>
								<Icon icon='delete' />
							</button>
						</div>
						{showTrendForm === trend.id && (
							<Modal onCloseModal={() => closeModal('trend-modal')}>
								<TrendForm
									formTitle={'Edit Trend'}
									formButtonText='update'
									views={trend.views}
									initialFormFields={{
										id: trend.id,
										title: trend.alt,
										content: trend.content,
										image: trend.image,
										category: trend.category,
										author_privacy: trend.author_privacy,
									}}
								/>
							</Modal>
						)}
					</div>
				))}
				<h2>{username}'s Comments</h2>
				{usersComments.map((comment) => (
					<div className='comment-info-container'>
						<div className='comment-info'>
							<div className='trend'>Trend: {comment.trend_title}</div>
							<div className='comment'>Comment: {comment.content}</div>
							<div className='author'>
								Date:{' '}
								{moment(comment.created_at).format('MMMM Do YYYY, h:mm:ss a')}
							</div>
						</div>
						<div className='buttons'>
              <button className='edit'
                onClick={() =>
                  setShowCommentForm(
                    comment.id === showCommentForm ? null : comment.id
                  )
                }>
                <Icon icon='edit' />
              </button>
              <button className='delete' onClick={() => onDeleteComment(comment.id)}><Icon icon='delete' /></button>
            </div>
						{showCommentForm === comment.id && (
							<Modal maxHeight={'40vh'} onCloseModal={() => closeModal('comment-modal')}>
								<DashboardCommentForm
									initialFormFields={{ id: comment.id, comment: comment.content }}
									username={username}
									trendId={comment.trend_id}
								/>
							</Modal>
						)}
					</div>
				))}
			</>
		</UserDashboardStyles>
	);
};

export default UserDashboard;

const UserDashboardStyles = styled.div`
	h2 {
		font-size: 1.3rem;
	}

	.title,
	.description,
	.date-created,
	.comment,
	.author,
	.trend {
		font-size: 0.8rem;
	}

	.trend-info-container {
		border: 1px solid var(--color-black-100);
		margin: 0.1rem;
		background-color: var(--color-white-100);
		border-radius: 0.2rem;
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		text-align: left;
	}
	.trend-info,
	.comment-info {
		padding: 0.2rem;
	}

	.comment-info-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
		border: 1px solid var(--color-black-100);
		margin: 0.1rem;
		background-color: var(--color-white-100);
		border-radius: 0.2rem;
		text-align: left;
	}

	.delete {
		margin: 0.2rem;
		padding: 0 0.01rem;
		border: 1px solid var(--color-white-100);
		font-size: 0.8rem;

		&:hover {
			border: 1px solid var(--color-alert-100);
			color: var(--color-alert-100);
		}
	}

	.edit {
		margin: 0.2rem;
		padding: 0 0.01rem;
		border: 1px solid var(--color-white-100);
		font-size: 0.8rem;
		&:hover {
			border: 1px solid var(--color-indigo-50);
			color: var(--color-indigo-50);
		}
	}

	.delete,
	.edit {
		border-radius: 0.2rem;
	}

  .private-messages-container{
    text-align: left;
  }
  .private-messages{
    display: inline-block;
    padding: 0.2rem;
    margin: 0.1rem;
    background-color: white;
    border-radius: 0.1rem;
    transition: all 0.3s;
    font-size: 0.1rem;
    box-shadow: 0.1px 0.1px 1.4px 0.6px var(--color-light-blue-100);
    
    &:hover{
      cursor: pointer;
      color: var(--color-light-blue-100);
      background: var(--color-black-100);
      box-shadow: 0.1px 0.1px 2.8px 1.2px var(--color-light-blue-100);
      transform: scale(1.05);
    }

    &:focus{
    }
  }
`;
