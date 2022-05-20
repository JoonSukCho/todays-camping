declare global {
  interface Window {
    gtag: (param1: string, param2: string, param3: object) => void;
  }
}

export const pageview = (url) => {
  window.gtag('config', process.env.GOOGLE_ANALYTICS, {
    page_path: url,
  });
};
