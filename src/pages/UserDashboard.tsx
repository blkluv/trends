import styled from 'styled-components';
import { useTrendingStore } from '../store';
import { filterTrendsByKeyValue } from '../utility/filters';
import moment from 'moment';
import { deleteTrend } from '../services/apiTrends';
import { useState } from 'react';
import { Trend } from '../interfaces/trend';
import Modal from '../components/Modal';
import TrendForm from '../components/TrendForm';
import Icon from '../components/Icon';
import { NavLink } from 'react-router-dom';

const UserDashboard = () => {
	const [username, user_id, storedTrends, setTrends, authToken] = useTrendingStore((store) => [store.username, store.user_id, store.trends, store.setTrends, store.authToken]);
	const [showForm, setShowForm] = useState<number|null>(null);
	const usersTrends = filterTrendsByKeyValue(
		'user_id',
		user_id,
		storedTrends
	);

	const onDeleteTrend = async(trend: Trend) => {
    if(!confirm("Are you sure you want to delete this trend?"))
      return;

		await deleteTrend(trend.id); // delete in db
		setTrends(storedTrends?.filter((storedTrend) => storedTrend.id !== trend.id)); // delete in store
	};

  const closeModal = () => {
		setShowForm(null);
		return showForm;
	};

  if(!authToken)
    return <p>Please <NavLink to='/auth'>login</NavLink> to access your dashboard</p>;

  if(usersTrends?.length === 0)
    return <p className="no-trends-message">It looks like you haven't made any trends yet. You can make one <NavLink to='/create-trend'>here</NavLink>. Once you do that all your trends will be listed in this dashboard, where you can edit and delete them.</p>

	return (
		<UserDashboardStyles>
			<h2>{username}'s Trends</h2>
			{usersTrends.map((trend) => (
				<div className='trend-info-container'>
					<div className='trend-info'>
						<div className='title'>Title: {trend.alt}</div>
						<p className='description'>Content: {trend.content.slice(0, 30)}...</p>
						<div className='date-created'>
							Date: {moment(trend.created_at).format('MMMM Do YYYY, h:mm:ss a')}
						</div>
					</div>
					<div>
						<button className='edit' title='edit' onClick={() => setShowForm(showForm === trend.id ? null : trend.id)}>
							<Icon icon='edit'/>
						</button>
						<button className='delete' title='delete' onClick={() => onDeleteTrend(trend)}>
            <Icon icon='delete'/>
						</button>
					</div>
					{showForm === trend.id && (
						<Modal onCloseModal={closeModal}>
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

  .delete, .edit{
    border-radius: 0.2rem;
  }
`;
