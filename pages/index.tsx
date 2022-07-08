import React, { createContext, Fragment, StrictMode } from 'react';
import { GetStaticPropsContext } from 'next';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';

import Layout from '@components/layout/Layout';
import ScreenOne from '@components/screens/screen-1/ScreenOne';
import ScreenTwo from '@components/screens/screen-2/ScreenTwo';
import ScreenThree from '@components/screens/screen-3/screenThree';
import ScreenFour from '@components/screens/screen-4/ScreenFour';
import ScreenFive from '@components/screens/screen-5/ScreenFive';


export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../messages/${locale}.json`)).default
    }
  };
}

export const LanguageContext = createContext('');

const Home: NextPage = () => {
  const t = useTranslations('core');
  const { locale } = useRouter();

  return (
    <LanguageContext.Provider value={locale || ''}>

      <Head>
        <title>{t('title')}</title>
        <meta name='description' content={t('desc')} />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      
      <Layout>

        <ScreenOne />

        <StrictMode>

          <ScreenTwo />
          <ScreenThree />
          <ScreenFour />
          <ScreenFive />

        </StrictMode>
        
      </Layout>

    </LanguageContext.Provider>
  )
}

export default Home;
