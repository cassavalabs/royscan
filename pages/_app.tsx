import type { AppProps } from "next/app";
import { GlobalStyle } from "style";
import { ThemeProvider } from "contexts/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
      <GlobalStyle />
    </ThemeProvider>
  );
}
