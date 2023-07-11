import { NavLink } from 'react-router-dom';
import { useTrendingStore } from '../store';
import { useMessages } from '../hooks/useMessages';
import { filterMessagesByUser } from '../utility/filters';
import styled from 'styled-components';
import moment from 'moment';

const PrivateMessages = () => {
	const [authToken, username] = useTrendingStore((store) => [
		store.authToken,
		store.username,
	]);
	const { data: messages, isLoading } = useMessages();
	let usersMessages: Message[] = [];
	if (messages) usersMessages = filterMessagesByUser(username, messages);

	if (!authToken)
		return (
			<p>Users must {<NavLink to='/auth'>login</NavLink>} to view messages.</p>
		);
  
  if(isLoading)
      return <div>Loading...</div>

	if (usersMessages.length === 0)
		return (
			<div>Currently there are no messages. Try messaging other users.</div>
		);

	return (
		<PrivateMessageStyles>
			<h2>Messages for {username}</h2>
			<div>
				{usersMessages?.map((message) => (
					<>
						<div className='message-info-container'>
							<div className='message-info'>{message.content}</div>
							<div className='from-user-and-date-created'>
								<span className='from-user'>@{message.from_user} on trend titled "{message.trend_title}"</span>
								<span className='date-created'>
									Date:{' '}
									{moment(message.created_at).format('MMMM Do YYYY, h:mm:ss a')}
								</span>
							</div>
						</div>
					</>
				))}
			</div>
		</PrivateMessageStyles>
	);
};

export default PrivateMessages;

//CSS Componentts
const PrivateMessageStyles = styled.div`
	font-size: 0.8rem;
	h2 {
		font-size: 1.3rem;
	}

	.message-info-container {
		border: 1px solid var(--color-black-100);
		margin: 0.1rem;
		background-color: var(--color-white-100);
		border-radius: 0.2rem;
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		align-items: flex-start;
		text-align: left;
	}
	.message-info {
		padding: 0.2rem;
	}

	.from-user-and-date-created {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: var(--color-grey-300);
		border-bottom-left-radius: 0.2rem;
		border-bottom-right-radius: 0.2rem;
		width: 100%;
		font-size: 0.4rem;
		padding-left: 0.1rem;
		padding-right: 0.1rem;
	}

  .title{
    width: 100%;
    text-align: center;
    font-weight: bold;
    font-size: 1rem;
    border-bottom:1px solid var(--color-black-50);
    margin: 0;
    padding: 0;
  }
`;
