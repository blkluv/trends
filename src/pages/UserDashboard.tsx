import styled from 'styled-components';
import { useTrendingStore } from '../store';
import {
	filterTrendsByKeyValue,
} from '../utility/filters';
import Icon from '../components/Icon';
import { NavLink, useNavigate } from 'react-router-dom';
import UserDashboardTrends from '../components/UserDashboardTrends';
import UserDashboardComments from '../components/UserDashboardComments';
import { useState } from 'react';
import { Button } from '../components/TrendForm';
import PrivateMessages from '../components/PrivateMessages';
import CommentsIcon from '../components/CommentsIcon';

// !Split this into several components and add different returns for if no trends, no comments, neither of the two etc.
const UserDashboard = () => {
	const [user_id, storedTrends, authToken] = useTrendingStore((store) => [store.user_id, store.trends, store.authToken]);
	const usersTrends = filterTrendsByKeyValue('user_id', user_id, storedTrends);
  const [subComponent, setSubComponent] = useState('trends');

	if (!authToken)
		return (
			<p>
				Please <NavLink to='/auth'>login</NavLink> to access your dashboard
			</p>
		);

	return (
		<UserDashboardStyles>
			<>
        <div className='sub-components'>
          <Button className='sub-component' onClick={() => setSubComponent('trends')}><Icon icon='trends'/>Trends</Button>
          <Button className='sub-component' onClick={() => setSubComponent('comments')}><Icon icon='comments'/>Comments</Button>
          <Button className='sub-component' onClick={() => setSubComponent('messages')}><Icon icon='mailForward'/>Messages</Button>
        </div>
        
				{subComponent === 'trends' && <UserDashboardTrends />}
				{subComponent === 'comments' && <UserDashboardComments />}
				{subComponent === 'messages' && <PrivateMessages />}
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
    }

    &:focus{
    }
  }

  .sub-components{
    display: flex;
    gap: 0.5rem;
    justify-content: center;
  }

  .sub-component{
    font-size: 0.5rem;
  }

  @media only screen and (max-width: 500px) {
    .sub-component{
        font-size: 0.1rem;
    }
  
		}
`;
