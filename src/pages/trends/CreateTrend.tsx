import { FieldValues, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import styled from 'styled-components';
import { createTrend } from '../../services/apiTrends';
import { useMutation } from '@tanstack/react-query';
import { TrendData } from '../../interfaces/trend';
import { useNavigate, redirect, NavLink } from 'react-router-dom';
import { useState} from 'react';
import { useTrendingStore } from '../../store';

// ! TODO 1) Refactor this into multiple components
// ! TODO 2) Validate user input. Limit description to 300 characters.
// When logged in, this option will appear
const CreateTrend = () => {
	const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [category, setCategory] = useState('');
  const username = useTrendingStore(store => store.username);
  const theme = useTrendingStore(store => store.theme);
  const authToken = useTrendingStore(store => store.authToken);
  console.log('theme: ', theme);
  const { isSuccess, isError, error, mutate } = useMutation({
    mutationFn: (trend: TrendData) => createTrend(trend),
  });

	const onSubmit = ({ content, image, title, category, privacy }: FieldValues) => {
		setCategory(category);

		const newTrend = {
			content,
			image,
			alt: title,
      category,
			likes: 0,
			dislikes: 0,
			author: privacy === 'private' ? 'anonymous' : username,
		};
		console.log('creating newTrend...', newTrend);

		mutate(newTrend);
	};

  if(isError)
    toast.error('Something went wrong...' + error.message)
  
  if(isSuccess){
    toast.success('Creating new trend...');
    navigate(`/${category}-trends`);
  }

  if(!authToken)
    return <p>Users must {<NavLink to='/auth'>login</NavLink>} before creating a trend.</p>

	return (
		<StyledForm setting={theme}>
			<Heading>New Trend</Heading>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormControl className='form-control'>
					<label id='title' htmlFor='title'>
						Title
					</label>
					<input 		autoFocus placeholder='Title' {...register('title')} />
				</FormControl>
				<FormControl className='form-control'>
					<label id='content' htmlFor='content'>
						Content
					</label>
					<textarea
						maxLength={300}
						rows={5}
						placeholder='Describe the trend in under 300 characters.'
						{...register('content')}
					/>
				</FormControl>
				<FormControl className='form-control'>
					<label id='image' htmlFor='image'>
						Image
					</label>
					<input placeholder='Add a picture link.' {...register('image')} />
				</FormControl>
				<FormControl>
          <label id='category' htmlFor='category'>Category</label>
					<select id='category' {...register('category')}>
						<option value='clothing'>clothing</option>
						<option value='movies'>movies</option>
						<option value='music'>music</option>
						<option value='technology'>technology</option>
					</select>
				</FormControl>
				<FormControl>
        <div className="privacy">
          <div className="public">
            <input type="radio" id="public" value="public" {...register('privacy')}/>
            <label className='public' htmlFor="public">Public<span className="small-text">[Post as "{username}"]</span></label>
          </div>
          <div className="private">
            <input type="radio" id="private" value="private" {...register('privacy')}/>
            <label className='private' htmlFor="private">Private<span className="small-text">[Post anonymously]</span></label>
          </div>
        </div>
				</FormControl>
				<Button>Create</Button>
			</form>
		</StyledForm>
	);
};

export default CreateTrend;

export const Heading = styled.h1`
	font-size: 1.6rem;
	color: var(--color-grey-500);
	text-align: center;
`;

export const StyledForm = styled.div`
	max-width: 50%;
	margin: auto;
  
  
	label {
		font-size: 0.95rem;
		color: var(--color-grey-500);
	}

	textarea,
	input {
		font-size: 0.7rem;
		border-radius: 0.1rem;
		padding: 0.2rem;
		resize: none;
		border: 1px solid var(--color-grey-100);
	}

	textarea:focus,
	input:focus {
		background-color:  var(--color-pink-10);
		outline: none;
	}

  select{
    margin: 0.4rem 0;
    padding: 0.1rem;
    font-size: 0.9rem;
    margin-top: 0;
  }

  select:focus{
    outline: none;
    background-color: var(--color-pink-10);
  }
`;

export const FormControl = styled.div`
	display: flex;
	flex-direction: column;

  .privacy{
    display: flex;
    margin: 0;
    padding: 0;
    gap: 1rem;
  }

  .private, .public{
    font-size: 0.8rem;
  }

  .small-text{
    font-size: 0.6rem;
  }
`;

export const Button = styled.button`
	margin: 0.5rem 0;
	padding: 0.1rem 0.8rem;
	font-size: 0.9rem;
  display: block;
`;
