import { useNavigate } from 'react-router-dom';
import { useTrendingStore } from './../store';
import toast from 'react-hot-toast';
import styled from 'styled-components';

const Logout = () => {
	const setAuthToken = useTrendingStore(store => store.setAuthToken);
	const setUsername = useTrendingStore(store => store.setUsername);
  const navigate = useNavigate();

  const confirmLogout = () => {
    setAuthToken('');
    setUsername('');
    toast.success('Logged out');
    navigate('/');
  }
	return (
		<>
			<p>Are you sure you want to logout?</p>
			<Button onClick={confirmLogout}>Confirm</Button>
		</>
	);
};
// CSS Components
const Button = styled.button`
	margin: 0.2rem 0;
	padding: 0 0.5rem;
	font-size: 0.9rem;
`;

export default Logout;
