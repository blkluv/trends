import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { login, signUp } from '../services/apiAuth';
import toast from 'react-hot-toast';
import { useTrendingStore } from '../store';
import { FaMapSigns } from 'react-icons/fa';
import { executeInTryCatchBlock } from '../utility/tryCatchHelpers';
import { useState } from 'react';

const Auth = () => {
	const { register, handleSubmit } = useForm();
	const [authType, setAuthType] = useState('login');
	const theme = useTrendingStore((store) => store.theme);
	const username = useTrendingStore((store) => store.username);
	const authToken = useTrendingStore((store) => store.authToken);
	const setAuthToken = useTrendingStore((store) => store.setAuthToken);
	const setUsername = useTrendingStore((store) => store.setUsername);
	const navigate = useNavigate();

	const onLoginOrSignUp = async ({ email, password }: FieldValues) => {
		const username = email.split('@')[0];
		// sign up
		if (authType === 'sign-up') { 
          await executeInTryCatchBlock(async() => {
          await signUp({ email, password });
          toast.success('Signed up. Logging in...');
          });
	}
		// login(default)
			await executeInTryCatchBlock(async() => {
      const { session } = await login({ email, password });
			
      if (!session) return toast.error('No session available...');
			
      setAuthToken(session?.access_token);
			setUsername(username);
			toast.success('Logged in. Redirecting back to home page...');
			setTimeout(() => navigate('/'), 2000);
      });
	};

	if (authToken)
		return (
			<StyledDiv>
				<span className='bold'>{username}</span> is currently logged in.
			</StyledDiv>
		);

	return (
		<StyledForm>
			<Heading>{authType}</Heading>
			<form onSubmit={handleSubmit(onLoginOrSignUp)}>
				<FormControl className='form-control'>
					<label id='email' htmlFor='email'>
						Email
					</label>
					<input
						autoFocus
						placeholder='abc@domain.com'
						{...register('email')}
					/>
				</FormControl>
				<FormControl className='form-control'>
					<label id='password' htmlFor='password'>
						Password
					</label>
					<input
						placeholder='enter password'
						type='password'
						{...register('password')}
					/>
				</FormControl>
				<Button>Submit</Button>
			</form>
			<Button
				size={'0.4rem'}
				padding={'0.2rem'}
				margin={'0rem'}
				color={
					theme === 'light'
						? 'var(--color-indigo-100)'
						: 'var(--color-pink-100)'
				}
        border={theme === 'light'
        ? '1px solid var(--color-indigo-100)'
        : '1px solid var(--color-pink-100)'}
				onClick={() =>
					authType === 'login' ? setAuthType('sign-up') : setAuthType('login')
				}>
				<FaMapSigns /> {authType === 'login' ? 'Sign up' : 'Login'}
			</Button>
		</StyledForm>
	);
};

export default Auth;

// CSS Components
const Heading = styled.h1`
	font-size: 1.6rem;
	color: var(--color-black-500);
	text-align: center;
	text-transform: capitalize;
`;

const StyledForm = styled.div`
	width: 50%;
	margin: auto;
	text-align: left;

	label {
		font-size: 0.7rem;
		color: var(--color-grey-500);
	}

	input {
		font-size: 0.7rem;
		border-radius: 0.1rem;
		padding: 0.2rem;
		resize: none;
		border: 1px solid var(--color-grey-100);
	}

	input:focus {
		background-color: rgb(255, 221, 255);
		/* var(--color-black-50) */
		outline: none;
	}
`;

const FormControl = styled.div`
	display: flex;
	flex-direction: column;
`;

const Button = styled.button`
	margin: 0.2rem 0;
	padding: 0 0.5rem;
	font-size: 0.9rem;
	${(props) => 'font-size: ' + props.size};
	${(props) => 'padding: ' + props.padding};
	${(props) => 'margin: ' + props.margin};
	${(props) => 'color: ' + props.color};
	${(props) => 'border: ' + props.border};

  &:hover{
    ${(props) => 'border: ' + props.borderHover};
    ${(props) => 'color: ' + props.colorHover};
  }
`;

const StyledDiv = styled.div`
	.bold {
		font-weight: 800;
	}
`;
