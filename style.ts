import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

*, *::before, *::after{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  overflow-x: hidden;
}

:root {
  min-height: 100vh;
  color: ${({ theme }) => theme.text200};
  background-color: ${({ theme }) => theme.white};
  display: flex;
  flex-direction: column;
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 400;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
  /* -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
  ::-webkit-scrollbar {
    width: 5px;
    background: #636975;
} */
}
`;
