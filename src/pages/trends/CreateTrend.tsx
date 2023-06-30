import { FieldValues, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import styled from 'styled-components';
import { createTrend } from '../../services/apiTrends';
import { useMutation } from '@tanstack/react-query';
import { TrendData } from '../../interfaces/trend';
import { useNavigate, NavLink } from 'react-router-dom';
import { useState} from 'react';
import { useTrendingStore } from '../../store';
import { StyledForm } from '../../components/CssComponents/StyledComponents';

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
  const user_id = useTrendingStore(store => store.user_id);
  console.log('theme: ', theme);
  const { isSuccess, isError, error, mutate } = useMutation({
    mutationFn: (trend: TrendData) => createTrend(trend),
  });
  const err: any = error;
  const kebabCaseify = (str: string) => {
    return str.split(' ').join('-');
  }
	const onSubmit = ({ content, image, title, category, privacy }: FieldValues) => {
		setCategory(kebabCaseify(category));

		const newTrend = {
			content,
			image,
			alt: title,
      category,
			likes: 0,
			dislikes: 0,
			author: privacy === 'private' ? 'anonymous' : username,
      user_id
		};
		console.log('creating newTrend...', newTrend);

		mutate(newTrend);
	};

  if(isError)
    toast.error('Something went wrong...' + err.message)
  
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
						<option value='clothing'>Clothing</option>
						<option value='movies'>Movies</option>
						<option value='music'>Music</option>
						<option value='video and tv'>Video and TV</option>
						<option value='technology'>Technology</option>
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
	text-align: center;
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
    font-size: 0.7rem;
  }

  .small-text{
    font-size: 0.5rem;
  }
`;

export const Button = styled.button`
	margin: 0.5rem 0;
	padding: 0.1rem 0.8rem;
	font-size: 0.9rem;
  display: block;
`;
