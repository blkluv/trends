import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { useTrendingStore } from '../store';

const AppLayout = () => {
  const theme = useTrendingStore(store => store.theme);

	return (
		<AppLayoutContainer setting={theme}>
      <HeaderStyles>
        <Header/>
      </HeaderStyles>
        <SidebarAndMainContentStyles>
          <Sidebar />
          <main>
            <Outlet />
          </main>
        </SidebarAndMainContentStyles>
    </AppLayoutContainer>
	);
};

export default AppLayout;

// Styled Components
const AppLayoutContainer = styled.div`
grid-template-columns: 1fr;
height: 100%;
${props => props.setting === 'light' ?  'background-color: var(--color-white-100)' : 'background-color: var(--color-indigo-50)'};
`
const HeaderStyles = styled.div`
	display: grid;
  @media only screen and (max-width: 500px) {
  display: flex;
  flex-direction: column;
  max-height: 20%;
  }
`;

const SidebarAndMainContentStyles = styled.div`
display: grid;
grid-template-columns: 1fr 4fr;

main{
  /* border: 1px solid var(--color-pink-100); */
  text-align: center;
  padding: 0.2rem;
  min-height: 100vh;
  height: auto;
}
@media only screen and (max-width: 500px) {
  grid-template-columns: 1fr;
  height: auto;
}
`;