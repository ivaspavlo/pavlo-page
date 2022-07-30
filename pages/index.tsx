import React, { createContext, useState } from 'react';
import { GetStaticPropsContext } from 'next';
import { NextPage } from 'next';
import Head from 'next/head';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import Layout from '@components/layout/Layout';
import ScreenOne from '@components/screens/screen-1/ScreenOne';
import ScreenTwo from '@components/screens/screen-2/ScreenTwo';
import ScreenThree from '@components/screens/screen-3/screenThree';
import Footer from '@root/components/footer/Footer';

const ScreenFour = dynamic(
  () => {
    return import('../components/screens/screen-4/ScreenFour')
  },
  { ssr: false }
);

export interface IMessage {
  value: string;
  type: 'error' | 'success' | 'hidden';
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
  const [message, setMessage] = useState<IMessage>({value: '', type: 'hidden'});

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
        <link rel='icon' href='/favicon.ico' />
      </Head>
      
      <Layout>

        <ScreenOne />
        <ScreenTwo />
        <ScreenThree />
        <ScreenFour />
        <Footer />
        
      </Layout>

    </CoreContext.Provider>
  );
}

export default Home;
