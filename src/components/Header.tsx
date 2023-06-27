import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { FcComboChart } from 'react-icons/fc';
import { useTrendingStore } from '../store';
import { IStyledProps } from '../interfaces/cssComponentStyles';


const Header = () => {
	const theme = useTrendingStore((store) => store.theme);
	const authToken = useTrendingStore((store) => store.authToken);
	const language = useTrendingStore((store) => store.language);
	const navLinks: any = useTrendingStore((store) => store.navLinks);
	const headerLinks = {
    logo: navLinks[language].logo,
		create: navLinks[language].create,
		settings: navLinks[language].settings,
		login: navLinks[language].login,
    logout: navLinks[language].logout,
	};

	return (
		<HeaderStyles setting={theme} language={language}>
			<NavLink to='/' className='trends-logo'>
				<span className='icon-and-logo'>
					{headerLinks.logo}
					<span className='icon'>
						<FcComboChart />
					</span>
				</span>
			</NavLink>
			<NavLinkStyles setting={theme}>
				<NavLink to='/create-trend'>{ headerLinks.create}</NavLink>
				<NavLink to='/settings'>{ headerLinks.settings}</NavLink>
				<NavLink to='/auth' hidden={!!authToken}>
					{!authToken && headerLinks.login}
				</NavLink>
				<NavLink to='/logout' hidden={!authToken}>
					{authToken && headerLinks.logout}
				</NavLink>
			</NavLinkStyles>
		</HeaderStyles>
	);
};

export default Header;

// Styled Components
const HeaderStyles = styled.div<IStyledProps>`
	${(props) =>
		props.setting === 'light'
			? 'background: var(--color-pink-100)'
			: 'background: var(--color-black-75)'};
  ${(props) =>
		props.language === 'japanese' ? 'font-size: 0.7rem' : ''};
	display: flex;
	align-items: flex-end;
	padding: 0.2rem;
	justify-content: space-between;

	.icon {
		font-size: 2.9rem;
	}

	.icon-and-logo {
		display: flex;
		align-items: center;
		padding: 0;
		margin: 0;
		max-height: 2.7rem;
		transition: all 0.4s;
		&:hover {
			transform: scale(1.03);
		}
	}
	.trends-logo {
		font-size: 1.8rem;
		font-weight: 700;
		color: var(--color-white-100);
    ${(props) =>
		props.language === 'japanese' ? 'font-size: 1.3rem' : ''};

		&:hover {
			${(props) =>
				props.setting === 'light'
					? 'color: var(--color-black-100)'
					: 'color: var(--color-indigo-100)'};
		}

		@media only screen and (max-width: 500px) {
			font-size: 1.5rem;
		}
	}

	@media only screen and (max-width: 500px) {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 0.6rem;
	}
`;

const NavLinkStyles = styled.div<IStyledProps>`
	display: flex;
	align-items: flex-end;
	gap: 0.7rem;
	align-items: center;

	a {
		color: var(--color-white-100);
		text-decoration: none;
		transition: all 0.4s;
	}
	a:hover {
		${(props) =>
			props.setting === 'light'
				? 'color: var(--color-black-100)'
				: 'color: var(--color-indigo-100)'};
		transform: scale(1.1);
	}
	@media only screen and (max-width: 300px) {
		display: flex;
		gap: 0.3rem;
	}
`;
