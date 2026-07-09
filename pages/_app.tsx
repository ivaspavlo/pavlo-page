import type { AppProps } from 'next/app';
import { NextIntlClientProvider } from 'next-intl';
import { useRouter } from 'next/router';
import 'bootstrap-4-grid/css/grid.min.css';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  const { locale: routerLocale } = useRouter();
  const locale = pageProps.locale || routerLocale || 'en';

  return (
    <NextIntlClientProvider locale={locale} messages={pageProps.messages} timeZone='Europe/Vienna'>
      <Component {...pageProps} />
    </NextIntlClientProvider>
  );
}

export default MyApp;
