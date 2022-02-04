import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { GlobalStyle } from 'styles/globalStyle';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RecoilRoot } from 'recoil';
import { theme } from 'styles/theme';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as MUIThemeProvider, StylesProvider } from '@material-ui/core/styles';

import * as ga from 'lib/ga';

import 'public/scss/material-kit-react.scss?v=1.10.0';
import 'public/css/fonts.css';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const kakaoAppKey = process.env.NEXT_PUBLIC_JS_KEY;
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: false, // 자동으로 쿼리의 요청 함수가 호출되도록 한다. (useEffect 처럼)
        // refetchOnMount: false, // 컴포넌트가 mount 될 때마다 요청 x
        refetchOnWindowFocus: false, // 화면이 focus 될 때마다 요청 x
        onSuccess: (data) => {
          // Add Todo
        },
        onError: (err) => {
          // Add Todo
        },
      },
    },
  });

  return (
    <>
      <Head>
        <meta
          charSet="uft-8"
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon.png" />
        <title>오늘의 캠핑</title>
        <script
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoAppKey}`}
        ></script>
      </Head>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <StylesProvider>
            <MUIThemeProvider theme={theme}>
              <ThemeProvider theme={theme}>
                <GlobalStyle />
                <Component {...pageProps} />
              </ThemeProvider>
            </MUIThemeProvider>
          </StylesProvider>
        </RecoilRoot>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
