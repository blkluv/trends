import { NavLink, useLocation } from 'react-router-dom';
import { Button, FormControl } from '../components/TrendForm';
import { FieldValues, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { StyledForm } from '../components/CssComponents/StyledComponents';
import toast from 'react-hot-toast';
import Icon from '../components/Icon';
import { useNavigate } from 'react-router-dom';
import { useTrendingStore } from '../store';
import { useMutateMessages } from '../hooks/useMutateMessages';

const PrivateMessage = () => {
  const [username, user_id, authToken] = useTrendingStore(store => [store.username, store.user_id, store.authToken]);
  const navigate = useNavigate();
	const location = useLocation();
	const { register, handleSubmit } = useForm();
	const { author, user_id: to_user_id } = location.state;
	const { mutate, isError, error } = useMutateMessages();

	const onSubmitMessage = async({ content }: FieldValues) => {
    const newMessage = {content, to_user: author, to_user_id, from_user: username, user_id };
    mutate(newMessage);

    if(isError)
      return toast.error(error as any);
    
    toast.success("Message sent.");
    navigate(-1);
	};

  // Not logged in user
	if (!authToken)
  return (
    <p>
      Users must {<NavLink to='/auth'>login</NavLink>} before sending messages.
    </p>
  );

// Logged in user
	return (
		<StyledForm>
			<form onSubmit={handleSubmit(onSubmitMessage)}>
				<FormControl className='form-control'>
					<label id='content' htmlFor='content'>
						<Heading>Message for {author}<Icon icon="mail" display='flex' marginBottom='0.25rem'/></Heading>
					</label>
					<textarea
						maxLength={1000}
						rows={5}
						placeholder='Max 1000 characters.'
						required
						{...register('content')}
					/>
				</FormControl>
				<Button>Send</Button>
			</form>
		</StyledForm>
	);
};

export default PrivateMessage;

// CSS Components
const Heading = styled.h1` 
  font-size: 1.4rem;
  display: flex;
  justify-content: center;
  align-items: end;
`
