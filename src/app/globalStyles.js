"use client"; // needs to be client component because it needs the theme context

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html, body {
    height: 100vh;
    width: 100vw;

    font-family: ${(props) => props.theme.typography.fontFamily};
  }
`;

export default GlobalStyle;
