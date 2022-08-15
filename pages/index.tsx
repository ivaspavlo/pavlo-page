import React, { createContext, useState } from 'react';
import { GetStaticPropsContext } from 'next';
import { NextPage } from 'next';
import Head from 'next/head';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';

import Layout from '@components/layout/Layout';
import Header from '@root/components/header/Header';
import Footer from '@root/components/footer/Footer';
import ScreenOne from '@components/screens/screen-1/ScreenOne';
import ScreenTwo from '@components/screens/screen-2/ScreenTwo';
import ScreenThree from '@components/screens/screen-3/screenThree';
import Experience from '@root/components/experience/Experience';
import Portfolio from '@root/components/portfolio/Portfolio';
import { CONSTANTS } from '@root/constants';

export interface IMessage {
  value: string;
  type: 'supportUkraine' | 'error' | 'success' | 'hidden';
}

export interface ICoreContext {
  language: string;
  message: {
    current: IMessage;
    setCurrent: (value: IMessage) => void
  }
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../messages/${locale}.json`)).default
    }
  };
}

export const CoreContext = createContext<ICoreContext>({
  language: '',
  message: {
    current: { value: '', type: 'hidden' },
    setCurrent: (value: IMessage) => {}
  }
});

const Home: NextPage = () => {
  const t = useTranslations('core');
  const { locale } = useRouter();
  const [message, setMessage] = useState<IMessage>({value: CONSTANTS.coreMessages.supportUkraine, type: 'supportUkraine'});

  return (
    <CoreContext.Provider value={{
      language: locale || '',
      message: {
        current: message,
        setCurrent: setMessage
      }
    }}>

      <Head>
        <title>{t('title')}</title>
        <meta name='description' content={t('desc')} />
        <link rel='Shortcut icon' href='/favicon.ico' />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-favicon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
      </Head>

      <Layout>

        <Header />
        <ScreenOne />
        <ScreenTwo />
        <ScreenThree />
        <Experience />
        <Portfolio />
        <Footer />
        
      </Layout>

    </CoreContext.Provider>
  );
}

export default Home;
