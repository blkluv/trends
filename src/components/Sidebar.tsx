import styled from 'styled-components';
import CommonTrendsNavList from './CommonTrendsNavList';
import { useTrendingStore } from '../store';
import { IStyledProps } from '../interfaces/cssComponentStyles';

const Sidebar = () => {
  const theme = useTrendingStore(store => store.theme);
  
	return (
		<>
			<SidebarStyles setting={theme}>
				<CommonTrendsNavList />
			</SidebarStyles>
		</>
	);
};

export default Sidebar;

// Styled Components
const SidebarStyles = styled.div<IStyledProps>`
  ${props => props.setting === 'light' ?  'background-color: var(--color-grey-300)' : 'background-color: var(--color-black-50)'};
 
  @media only screen and (max-width: 500px) {
    max-height: 2rem;
		}
`;
