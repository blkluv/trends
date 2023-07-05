import styled from 'styled-components';
import { useTrendingStore } from '../store';
import { filterTrendsByKeyValue } from '../utility/filters';
import moment from 'moment';
import { deleteTrend } from '../services/apiTrends';
import { useState } from 'react';
import { Trend } from '../interfaces/trend';
import Modal from '../components/Modal';
import TrendForm from '../components/TrendForm';

const UserDashboard = () => {
	const [username, user_id, storedTrends, setTrends] = useTrendingStore((store) => [store.username, store.user_id, store.trends, store.setTrends]);
	const [showForm, setShowForm] = useState(false);
	const usersTrends = filterTrendsByKeyValue(
		'user_id',
		user_id,
		storedTrends
	);
  console.log('usersTrends', usersTrends);

	const onDeleteTrend = (trend: Trend) => {
		deleteTrend(trend.id); // delete in db
		setTrends(storedTrends?.filter((storedTrend) => storedTrend.id !== trend.id)); // delete in store
	};

	const toggleModal = () => {
		setShowForm(!showForm);
		return showForm;
	};

	const onSetLocalTrends = (trend: Trend, id: number) => {
		const updatedTrends = usersTrends?.filter(
			(trend) => trend.id !== id
		);
		setTrends([...updatedTrends, trend]);
	};
	return (
		<UserDashboardStyles>
			<h2>{username}'s Trends</h2>
			{usersTrends.map((trend) => (
				<div className='trend-info-container'>
					<div className='trend-info'>
						<div className='title'>Title: {trend.alt}</div>
						<p className='description'>Content: {trend.content.slice(0, 30)}</p>
						<div className='date-created'>
							Date: {moment(trend.created_at).format('MMMM Do YYYY, h:mm:ss a')}
						</div>
					</div>
					<div>
						<button className='edit' onClick={() => setShowForm(true)}>
							edit
						</button>
						<button className='delete' onClick={() => onDeleteTrend(trend)}>
							delete
						</button>
					</div>
					{showForm && (
						<Modal onToggleModal={toggleModal}>
							<TrendForm
								formTitle={'Edit Trend'}
								formButtonText='update'
								onSetParentsLocalState={onSetLocalTrends}
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
	.date-created {
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

	.trend-info {
		padding: 0.2rem;
	}

	.delete {
		margin: 0.2rem;
		padding: 0 0.2rem;
		border: 1px solid var(--color-white-100);
		font-size: 0.8rem;

		&:hover {
			border: 1px solid var(--color-alert-100);
			color: var(--color-alert-100);
		}
	}

	.edit {
		margin: 0.2rem;
		padding: 0 0.2rem;
		border: 1px solid var(--color-white-100);
		font-size: 0.8rem;
		&:hover {
			border: 1px solid var(--color-indigo-50);
			color: var(--color-indigo-50);
		}
	}
`;
