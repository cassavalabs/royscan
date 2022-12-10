import type { AppProps } from "next/app";
import { GlobalStyle } from "style";
import { ThemeProvider } from "contexts/theme";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Head>
        <title>Royscan</title>
        <meta
          name="description"
          content="An opensource source project for exploring, analyzing and rewarding NFT royalty fulfilment on Solana blockchain"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
      <GlobalStyle />
    </ThemeProvider>
  );
}
