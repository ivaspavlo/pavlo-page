import type { AppProps } from 'next/app';
import { NextIntlProvider } from 'next-intl';
import '@root/styles/globals.scss';


function MyApp({ Component, pageProps }: AppProps) {

  return (
    <NextIntlProvider messages={pageProps.messages}>
      <Component {...pageProps} />
    </NextIntlProvider>
  );
}

export default MyApp;
