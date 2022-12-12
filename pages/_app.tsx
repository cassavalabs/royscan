import type { AppProps } from "next/app";
import { Container, GlobalStyle } from "style";
import { ThemeProvider } from "contexts/theme";
import Head from "next/head";
import { Navbar } from "components/Navbar";
import { useRouter } from "next/router";

import "antd/dist/reset.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

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
      <Container>
        <Navbar isHome={router.pathname === "/"} />
        <Component {...pageProps} />
      </Container>
      <GlobalStyle />
    </ThemeProvider>
  );
}
