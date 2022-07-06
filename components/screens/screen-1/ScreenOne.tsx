import React, { createElement, RefObject, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { InView } from 'react-intersection-observer';

import { CONSTANTS } from '@root/constants';
import ButtonPrimary from '@components/button-primary/ButtonPrimary';

import styles from './ScreenOne.module.scss';


function ScreenOne() {
  const t = useTranslations('screen-one');
  const titleRef: RefObject<HTMLDivElement> = useRef(null);
  const subtitleRef: RefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    cursorRunner(
      titleRef.current as HTMLElement,
      t('greets-1')
    );
    cursorRunner(
      titleRef.current as HTMLElement,
      t('greets-2')
    );
  }, []);

  const animateMainBlock = {
    open: { translateY: 0, opacity: 1 },
    closed: { translateY: '-20%', opacity: 0 }
  };

  let i = 0;

  function cursorRunner(elem: HTMLElement, text: string): void {
    elem.append(text.charAt(i));
    i++;
    setTimeout(
      function() {
        if (i < text.length) {
          cursorRunner(elem, text);
        } else {
          const brElem = document.createElement('br');
          brElem.classList.add('d-none', 'd-md-inline-flex');
          elem.append(brElem);
          return;
        }
      }, Math.floor(Math.random() * 220) + 50);
  }

  return (
    <InView threshold={0.25}>
      {({ref, inView}) => (
        <section id={CONSTANTS.sectionIds.sectionOne} ref={ref} className={styles.screenOne}>

          <div className={styles.screenOne__container}>
            <div className={styles.mainBlock}>

              <motion.h1
                ref={titleRef}
                initial={false}
                animate={inView ? 'open' : 'closed'}
                variants={animateMainBlock}
                transition={{ duration: .8, ease: 'easeOut' }}
                className={styles.mainBlock__title}>
                  {/* {t('greets-1')}, <br className='d-none d-md-inline-flex' />{t('greets-2')} */}
              </motion.h1>

              <motion.h4
                ref={subtitleRef}
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

        </section>
      )}
    </InView>
    )
}

export default ScreenOne;
