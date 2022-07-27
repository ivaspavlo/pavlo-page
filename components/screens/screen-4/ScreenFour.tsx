import React from 'react';
import Experience from '@components/experience/Experience';
import Portfolio from '@components/portfolio/Portfolio';
import Footer from '@components/footer/Footer';

import styles from './ScreenFour.module.scss';


function ScreenFour() {
  return (
    <section className={styles.screenFour}>
      <Experience />
      <Portfolio />
      <Footer />
    </section>
  );
}

export default ScreenFour;
