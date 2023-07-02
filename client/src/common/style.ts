import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
  }

  ::-webkit-scrollbar {
  width: 0;
  }

  html, body, #root {
    width: 100%;
    min-height: 100%;
  }
`;