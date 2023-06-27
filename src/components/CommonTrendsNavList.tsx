import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Icon from './Icon';
import { useTrendingStore } from '../store';
import { IStyledProps} from '../interfaces/cssComponentStyles';


interface Props {
	trends: string[];
}

// Trends for sidebar
const CommonTrendsNavList = () => {
	const navigate = useNavigate();
  const theme = useTrendingStore(store => store.theme);
  const navLinks = useTrendingStore(store => store.navLinks);
  const language = useTrendingStore(store => store.language);

  // Temporary: data will be stored on backend.
const trends = [
	{ id: '/clothing', type: navLinks[language].clothing, icon: 'clothing' },
	{ id: '/movies', type: navLinks[language].movies, icon: 'movie' },
	{ id: '/music', type: navLinks[language].music, icon: 'music' },
	{ id: '/technology', type: navLinks[language].technology, icon: 'technology' },
];

	return (
		<CommonTrendsNavListStyles setting={theme}>
			<div className='suggest'>
			<button id='btn' className='btn' onClick={() => navigate('/suggest-trend-category')}>Suggest</button>
			</div>
			<ul className='trend-links'>
				{trends.map(({ id, type, icon }) => (
					<NavLink to={`${id}-trends`} key={id}>
            <Icon icon={icon}/>
						<span className="trend-text">{type}</span>
					</NavLink>
				))}
			</ul>
		</CommonTrendsNavListStyles>
	);
};

export default CommonTrendsNavList;

// CSS Components

const CommonTrendsNavListStyles = styled.ul<IStyledProps>`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	gap: 1rem;
  height: 100vh;
	color: white;
	text-align: center;

  @media only screen and (max-width: 500px) {
			height: 5vh;
		}

	a {
		color: var(--color-white-100);
		text-decoration: none;
		font-weight: 700;
		transition: all 0.4s;
	}

  .trend-links {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		@media only screen and (max-width: 500px) {
			font-size: 0.5rem;
			flex-direction: row;
			margin: auto;
			gap: 1.4rem;
		}
	}

	.trend-links a:hover {
    ${props => props.setting === 'light' ?  'color: var(--color-pink-100)' : 'color: var(--color-indigo-100)'};
		transform: scale(1.2);
	}

  .trend-text{
    @media only screen and (max-width: 500px) {
		display: none;
	}
  }

	.suggest {
		color: white;
    margin-top: 0.5rem;
		font-size: 0.8rem;
		background-color: #545b65;
		padding: 0.1rem;
		text-align: center;
		text-decoration: none;
    ${props => props.setting === 'light' ?  'background-color: var(--color-grey-300)' : 'background-color: var(--color-black-50)'};
		@media only screen and (max-width: 500px) {
			display: none;
		}
	}

  .suggest:hover{
      color: blue;
    }

	button {
    padding: 0rem 1rem;
		margin: auto;
		color: #939393;
    background-color: var(--color-white-100);
		@media only screen and (max-width: 500px) {
      font-size: 0.5rem;
			margin-top: 0.2rem;
		}
	}

  button:hover{
    ${props => props.setting === 'light' ?  'color: var(--color-pink-100)' : 'color: var(--color-indigo-50)'}
  }
`;
