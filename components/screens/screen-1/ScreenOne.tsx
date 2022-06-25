import React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { InView } from 'react-intersection-observer';

import { CONSTANTS } from '@root/constants';
import ButtonPrimary from '@components/button-primary/ButtonPrimary';

import styles from './ScreenOne.module.scss';


function ScreenOne() {
  const t = useTranslations('screen-one');
  const animateMainBlock = {
    open: { translateY: 0, opacity: 1 },
    closed: { translateY: '-20%', opacity: 0 }
  }

  return (
    <InView threshold={0.25}>
      {({ref, inView}) => (
        <section id={CONSTANTS.sectionIds.sectionOne} ref={ref} className={styles.screenOne}>

          <div className={styles.screenOne__container}>
            <div className={styles.mainBlock}>

              <motion.h1
                initial={false}
                animate={inView ? 'open' : 'closed'}
                variants={animateMainBlock}
                transition={{ duration: .8, ease: 'easeOut' }}
                className={styles.mainBlock__title}>
                  {t('greets-1')}, <br className='d-none d-md-inline-flex' />{t('greets-2')}
              </motion.h1>

              <motion.h4
                initial={false}
                animate={inView ? 'open' : 'closed'}
                variants={animateMainBlock}
                transition={{ duration: .8, ease: 'easeOut', delay: .5 }}
                className={styles.mainBlock__subtitle}>
                  {t('intro-text')}
              </motion.h4>

              <motion.div
                initial={false}
                animate={inView ? 'open' : 'closed'}
                variants={animateMainBlock}
                transition={{ duration: .8, ease: 'easeOut', delay: 1 }}
                className={styles.mainBlock__buttonWrap}>
                  <ButtonPrimary title={t('btn-learn-more')} link='/' filled={true}/>
              </motion.div>

            </div>
    
          </div>

          <div className={styles.screenOne__decor_1}></div>
          <div className={styles.screenOne__decor_2}></div>
          <div className={styles.screenOne__decor_3}></div>
          <div className={styles.screenOne__decor_4}></div>
          <div className={styles.screenOne__decor_5}></div>

        </section>
      )}
    </InView>
    )
}

export default ScreenOne;
