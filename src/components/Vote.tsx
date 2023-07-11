import { FaHeart, FaHeartBroken } from 'react-icons/fa';
import { useMutateVotes } from '../hooks/useMutateVotes';
import toast from 'react-hot-toast';
import { useState } from 'react';
import styled from 'styled-components';
import { updateVotedList, isAlreadyInVotedList } from '../services/apiTrends';
import { useTrendingStore } from '../store';

interface Props{
  likes: number;
  dislikes: number;
  id: number;
}
const Vote = ({ likes, dislikes, id }: Props) => {
  const username = useTrendingStore(store => store.username);
  const [data, setData] = useState({ likes, dislikes });
  const {
		isError: isVoteError,
		error,
		mutate: mutateLikesOrDislikes,
	} = useMutateVotes(id);
  const voteError: any = error;

  const validateVoter = async() => {
    // Check if logged in
    if(!username)
      return {isValid: false, invalidMessage: 'Please login to vote.'};
    // Check if already voted
    if(await isAlreadyInVotedList(id, username)) 
      return {isValid: false, invalidMessage: 'Only one vote is allowed per trend. You already voted for this trend.'};

    return {isValid: true, invalidMessage: ''};
  }

	// Voting
	const vote = async(type: string) => {
		
    const {isValid, invalidMessage } = await validateVoter();
    if(!isValid) return toast.error(invalidMessage);
    // updates db list of who voted
    updateVotedList(id, username);

		if (isVoteError) return toast.error(voteError.message);
 
		if (type === 'dislike') {
			mutateLikesOrDislikes({ value: dislikes + 1, type: 'dislikes' });
			setData({ ...data, dislikes: data.dislikes + 1 });
		} else {// (type === 'like')
			mutateLikesOrDislikes({ value: likes + 1, type: 'likes' });
			setData({ ...data, likes: data.likes + 1 });
		}

		toast.success('Voted');
	};
  
  return ( <VoteStyles>
  <span className='like-icon'>
    <FaHeart className='like' title='like' onClick={() => vote('like')} />
    {data.likes}
  </span>
  <span className='dislike-icon'>
    <FaHeartBroken title='dislike' onClick={() => vote('dislike')} /> {data.dislikes}
  </span>
</VoteStyles> );
}
 
export default Vote;

//CSS Components
const VoteStyles = styled.div`
		display: flex;
		justify-content: center;
		width: 50%;
		margin: auto;
		gap: 4rem;
	

	.like-icon {
		color: #860000;
	}

	.dislike-icon {
		color: #4c4c4c;
	}

	.like-icon,
	.dislike-icon {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.2rem;
		transition: all 0.3s;
	}

	.like-icon:hover,
	.dislike-icon:hover {
		transform: scale(1.1);
		cursor: pointer;
	}

	.like-icon:hover {
		color: red;
	}
	.dislike-icon:hover {
		color: #000000;
	}
`;