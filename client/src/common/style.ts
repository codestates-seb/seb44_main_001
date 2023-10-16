import styled, { createGlobalStyle } from 'styled-components';
import JamsilRg from '../common/fonts/TheJamsil3Regular.woff2';
import JamsilBd from '../common/fonts/TheJamsil5Bold.woff2';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: JamsilRg;
  }

  a {
  text-decoration: none;
  }

  ::-webkit-scrollbar {
  width: 0;
  }

  html, body, #root {
    width: 100%;
    min-height: 100%;
    background-color: var(--color-light-yellow);
  }

  #root{
    position: absolute;
  }

  main {
    padding-bottom: 5rem;
    height: 100%;
  }
  button{
    cursor: pointer;
    background-color: transparent;
    border: none;
  }
  :root { 
  /* Color */
  --color-light-yellow:#FFF8D0;
  --color-pink-1: #FFA5AF;
  --color-pink-2: #FFCAD0;
  --color-pink-3: #FFF1F3;
  --color-white: #FFFFFF;
  --color-black: #444444;
  --color-gray: #CCCCCC;

  /* Font Size */
  --font-size-xs: 0.875rem;
  --font-size-s: 1rem;
  --font-size-m: 1.5rem;
  --font-size-l: 2rem;
  --font-size-xl: 3rem;
  --font-size-xxl: 3.75rem;
  }
  @font-face {
    font-family: 'JamsilRg';
    src: local('JamsilRg'), url(${JamsilRg}) format('woff2');
  }
  @font-face {
    font-family: 'JamsilBd';
    src: local('JamsilBd'), url(${JamsilBd}) format('woff2');
  }

  input,select {
    border-radius: 5px;
    padding: 0.5rem;
    border: 2px solid var(--color-black);
    font-size: small;
  }

  input:focus { outline:none; }
`;

export const Layout = styled.div`
  display: flex;
  justify-content: center;
`;
