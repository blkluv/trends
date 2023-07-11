import { useLocation } from 'react-router-dom';
import { Button, FormControl } from '../components/TrendForm';
import { FieldValues, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { StyledForm } from '../components/CssComponents/StyledComponents';

const PrivateMessage = () => {
	const location = useLocation();
	const { register, setValue, handleSubmit } = useForm();
	const { author, user_id } = location.state;
	console.log(author, user_id);

	const onSubmitMessage = ({ content }: FieldValues) => {
		console.log(content);
	};
	return (
		<StyledForm>
			<form onSubmit={handleSubmit(onSubmitMessage)}>
				<FormControl className='form-control'>
					<label id='content' htmlFor='content'>
						Message for {author}
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
