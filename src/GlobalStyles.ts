import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
:root{
font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif, Avenir, Helvetica, Arial, sans-serif;
line-height: 1.5;
font-weight: 400;
height: 100%;

// colors
--color-grey-50: rgb(243, 243, 243);
--color-grey-100: rgb(170, 170, 170);
--color-grey-300: #8d9bac;
--color-grey-500: #3d3d3d;

--color-black-50: #2e2e2e;
--color-black-75: #1b1b1b;;
--color-black-100: #0f0f0f;

--color-pink-10: rgb(255, 221, 255);
--color-pink-50: #ff00887f;
--color-pink-100: #ff0088;

--color-purple-10: rgb(255, 221, 255);
--color-purple-50: rgb(229, 216, 255);
--color-purple-500: #5a1de9;

--color-green-100: #01c58e;

--color-indigo-50:#5a92fa;
--color-indigo-100:#0059ff;
--color-indigo-500:#1e56ff;

--color-light-blue-100:#00b3ff;

--color-blue-50: #016cc327;
--color-blue-100: #2b00ff;
--color-blue-500: #016cc3;

--color-white-100: white;
}

*,*::before, *::after{
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html{
  transition: all 0.3s;
}

input, button, textarea, select{
  font: inherit;
  color: inherit;
}

button{
  cursor: pointer;
  border: 1px solid var(--color-grey-50);
  border-radius: 0.15rem;
  transition: all 0.4s;
  border: transparent;
}

button:hover{
  transform: scale(1.05);
  background-color: var(--color-black-100);
  color: var(--color-white-100);
  
}

img{
  border-radius: 0.1rem;
}

*:disabled{
  cursor: not-allowed;
}

a{
  color: var(--color-indigo-500);
}

a:hover{
  color: var(--color-pink-100);
}
`;
