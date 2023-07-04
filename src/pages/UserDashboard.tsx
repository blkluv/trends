import styled from 'styled-components';
import { useTrendingStore } from '../store';
import { filterTrendsByKeyValue } from '../utility/filters';
import moment from 'moment';
import { deleteTrend } from '../services/apiTrends';
import { useTrends } from '../hooks/useTrends';
import { useState } from 'react';
import { Trend } from '../interfaces/trend';
import Modal from '../components/Modal';
import TrendForm from '../components/TrendForm';

const UserDashboard = () => {
	const username = useTrendingStore((store) => store.username);
	const user_id = useTrendingStore((store) => store.user_id);
	const { data: dbTrends } = useTrends();
	const [localTrends, setLocalTrends] = useState<Trend[]>(dbTrends || []);
	const [showForm, setShowForm] = useState(false);
	const filteredByUserTrends = filterTrendsByKeyValue(
		'user_id',
		user_id,
		localTrends
	);

	const onDeleteTrend = (trend: Trend) => {
		deleteTrend(trend.id); // delete in db
		setLocalTrends(
			localTrends?.filter((localTrend) => localTrend.id !== trend.id)
		); // delete locally
	};

	const toggleModal = () => {
		setShowForm(!showForm);
		return showForm;
	};

  const getTrendData = (trendId: number) => {
    return filteredByUserTrends.find(trend => trend.id === trendId);
  }

	const onSetLocalTrends = (trend: Trend, id: number) => {
		const updatedTrends = filteredByUserTrends?.filter(
			(trend) => trend.id !== id
		);
		console.log('updatedTrends: ', updatedTrends);
		setLocalTrends([...updatedTrends, trend]);
	};
	return (
		<UserDashboardStyles>
			<h2>{username}'s Trends</h2>
			{filteredByUserTrends.map((trend) => (
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
