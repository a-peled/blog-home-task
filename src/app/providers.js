"use client";

import { ThemeProvider } from "styled-components";
import { theme } from "../theme/theme";
import GlobalStyle from "./globalStyles";

export default function Providers({ children }) {
  return (
    // this is how we can get the theme everywhere, similar to useContext
    <ThemeProvider theme={theme}>
      {
        // global styles are needed here because they are the same for each page,
        // and need to be applied for all pages that are the children of this providers tag
      }
      <GlobalStyle />

      {children}
    </ThemeProvider>
  );
}
