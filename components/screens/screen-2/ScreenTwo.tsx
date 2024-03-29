import React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { InView } from 'react-intersection-observer';

import { CONSTANTS } from '@root/constants';
import { onClickAnchorHandler } from '@root/utils';
import ButtonSecondary from '@components/button-secondary/ButtonSecondary';
import ButtonPrimary from '@components/button-primary/ButtonPrimary';

import styles from './ScreenTwo.module.scss';


function ScreenTwo() {
  const t = useTranslations('screen-two');
  const age = getCurrentAge();
  const animate_1 = { open: { translateY: 0, opacity: 1 }, closed: { translateY: '-15px', opacity: 0 } };
  const animate_2 = { open: { translateX: 0, opacity: 1 }, closed: { translateX: '-10px', opacity: 0 } };

  function getCurrentAge() {
    const birthYear = 1988;
    const birthMonth = 7;
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    return currentYear - birthYear - (currentMonth - birthMonth < 0 ? 1 : 0);
  };

  return (
    <InView threshold={0.1}>
      {({ref, inView}) => (
        <section ref={ref} className={styles.screenTwo}>

          <div id={CONSTANTS.sectionIds.sectionTwo} className={styles.screenTwo__container}>

            <motion.div
              initial={false}
              animate={inView ? { opacity: 1 } : { opacity: 0}}
              transition={{ duration: 1, ease: 'easeOut' }}
              className={styles.myImage}
            ></motion.div>

            <div className={styles.mainBlock}>

              <motion.h5
                initial={false}
                animate={inView ? 'open' : 'closed'}
                variants={animate_1}
                transition={{ duration: .8, ease: 'easeOut', delay: .2 }}
                className={styles.mainBlock__subtitle}
              >{t('subtitle')}</motion.h5>

              <motion.h3
                initial={false}
                animate={inView ? 'open' : 'closed'}
                variants={animate_1}
                transition={{ duration: .8, ease: 'easeOut', delay: .4 }}
                className={styles.mainBlock__title}>
                  <span>{t('title')}</span>
                  <motion.div
                    initial={false}
                    animate={inView ? { scale: [1,1.2,1.2,1], rotate: [0,-30,30,0] } : { scale: 1 }}
                    transition={{ duration: .7, delay: 1 }}
                    className='ml-2 d-inline-flex'
                  >👋</motion.div>
              </motion.h3>

              <motion.div
                initial={false}
                animate={inView ? 'open' : 'closed'}
                variants={animate_1}
                transition={{ duration: .8, ease: 'easeOut', delay: .8 }}
                className={styles.mainBlock__desc}>
                  <p>{t('desc')}</p>
                  <p className={styles.mainBlock__desc_emmi}>
                    <span className='mr-2'>🐈</span>
                    <span className='mr-1'>{t('emmi')}</span>
                  </p>
              </motion.div>

              <div className='w-100 d-flex flex-column flex-lg-row'>
                <div className='mr-4 d-flex flex-column'>
                  <motion.p
                    initial={false}
                    animate={inView ? 'open' : 'closed'}
                    variants={animate_2}
                    transition={{ duration: .4, ease: 'easeOut', delay: .2 }}
                    className={styles.mainBlock__myInfo}>
                      <b>{t('name-title')}:</b>{t('name')}
                  </motion.p>
                  <motion.p
                    initial={false}
                    animate={inView ? 'open' : 'closed'}
                    variants={animate_2}
                    transition={{ duration: .4, ease: 'easeOut', delay: .4 }}
                    className={styles.mainBlock__myInfo}>
                      <b>{t('age-title')}:</b>{age}
                  </motion.p>
                </div>
                <div className='d-flex flex-column'>
                  <motion.a
                    initial={false}
                    animate={inView ? 'open' : 'closed'}
                    variants={animate_2}
                    transition={{ duration: .4, ease: 'easeOut', delay: .6 }}
                    className={`${styles.mainBlock__myInfo} ${styles.mainBlock__myInfo_email}`}>
                      <b>{t('email-title')}:</b>
                      <span>ivaspavlo@gmail.com</span>
                  </motion.a>
                  <motion.p
                    initial={false}
                    animate={inView ? 'open' : 'closed'}
                    variants={animate_2}
                    transition={{ duration: .4, ease: 'easeOut', delay: .8 }}
                    className={styles.mainBlock__myInfo}>
                      <b>{t('location-title')}:</b>{t('location')}
                  </motion.p>
                </div>
              </div>

              <motion.div
                initial={false}
                animate={inView ? { opacity: 1 } : { opacity: 0}}
                transition={{ duration: .3, ease: 'easeOut', delay: 1.5 }}
                className={styles.mainBlock__controls}>
                  <div className={styles.mainBlock__buttonWrap}>
                    <ButtonPrimary onClick={() => onClickAnchorHandler(CONSTANTS.sectionIds.experience)} title={t('btn-experience')} link='/' filled={true}/>
                  </div>
                  <div className={styles.mainBlock__buttonWrap}>
                    <ButtonSecondary link='/pavlo_ivashchenko.pdf' title={t('btn-cv')} />
                  </div>
              </motion.div>

            </div>

          </div>

        </section>
        
      )}
    </InView>
  );
}

export default ScreenTwo;
