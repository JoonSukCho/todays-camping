import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Head from 'next/head';
import { QueryClientProvider, QueryClient } from 'react-query';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { useDispatch } from 'react-redux';
import { GlobalStyle } from 'styles/globalStyle';
import {
  ThemeProvider as MUIThemeProvider,
  StylesProvider,
} from '@material-ui/core/styles';

// redux
import wrapper from 'store/configureStore';
import { REQUEST_USER_INFO } from 'reducers/user';

// theme, css
import { theme } from 'styles/theme';
import 'public/scss/material-kit-react.scss?v=1.10.0';
import 'public/css/fonts.css';

// lib
import * as ga from 'lib/ga';

declare global {
  interface Window {
    kakao: any;
  }
}

axios.defaults.withCredentials = true;
axios.defaults.headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'access-token': 'Bearer ',
  'refresh-token': 'Bearer ',
};

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: REQUEST_USER_INFO,
    });
  }, []);

  // 구글 애널리틱스 페이지 이동 조회
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
        <meta
          name="google-site-verification"
          content="_8ugsblGFpOipbnoC-93ojIr69xwJK1od9Gj5aO_OlE"
        />
        <meta
          name="naver-site-verification"
          content="0dd7e94a0ebb7299654d1960ad389287e3a380c2"
        />
        <meta
          name="description" content="오늘의 캠핑"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon.png" />
        <title>오늘의 캠핑</title>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.GOOGLE_ANALYTICS}', {
          page_path: window.location.pathname,
        });
      `,
          }}
        />
        <script
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_JS_KEY}`}
        />
        <script
          defer
          src="https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js"
        />
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

export default wrapper.withRedux(MyApp);
