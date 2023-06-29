import styled from "styled-components";
import { useTrendingStore } from "../store";
import { DarkModeSwitch } from 'react-toggle-dark-mode';

// ! Fix bug to remove cursor from becoming pointer on sun / moon svg
const Settings = () => {
  const theme = useTrendingStore(store => store.theme);
  const toggleTheme = useTrendingStore(store => store.toggleTheme);
  const language = useTrendingStore(store => store.language);
  const toggleLanguage = useTrendingStore(store => store.toggleLanguage);

	return (
		<SettingsStyles>
      <h2>Settings</h2>
      <DarkModeSwitch style={{ marginBottom: '2rem' }}
      checked={theme === 'dark'}
      onChange={() => ''}
      size={120} moonColor={'black'} sunColor={'orange'}/>
			<ul className='settings'>
				<button onClick={toggleTheme}>{ theme === 'light' ? 'Dark' : 'Light'} Theme</button>
				<button onClick={toggleLanguage}>{ language === 'english' ? '日本語' : 'English'}</button>
				<li>Setting 3 - Coming soon</li>
			</ul>
		</SettingsStyles>
	);
};

export default Settings;

const SettingsStyles = styled.div`
  ul{
    list-style: none;
  }

  button{
    padding: 0.1rem 0.5rem;
    border:1px solid var(--color-indigo-100);
    background-color: transparent;
  }
  
  button:hover{
    border: 1px solid var(--color-pink-100);
    color: var(--color-pink-100);
    background-color: transparent;
  }

  .settings{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`