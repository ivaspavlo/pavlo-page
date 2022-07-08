import React, { memo, RefObject, useContext, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { InView } from 'react-intersection-observer';

import { CONSTANTS } from '@root/constants';
import { LanguageContext } from '@root/pages';
import ButtonPrimary from '@components/button-primary/ButtonPrimary';

import styles from './ScreenOne.module.scss';


function ScreenOne() {
  const t = useTranslations('screen-one');
  const titleRef: RefObject<HTMLDivElement> = useRef(null);
  const currentLang: string | null = useContext(LanguageContext);

  useEffect(() => {
    startCursorAnimation(
      titleRef.current as HTMLElement,
      [t('greets-1'), t('greets-2')]
    );
  }, [currentLang]);

  const animateMainBlock = {
    open: { translateY: 0, opacity: 1 },
    closed: { translateY: '-20%', opacity: 0 }
  };

  function startCursorAnimation(target: HTMLElement, texts: string[], delimeter?: string | HTMLElement): void {
    target.textContent = '';

    const _delimenter = delimeter || getBrElement();

    const elements = texts.reduce((acc: any[], curr, i, arr) => {
      const isLastElem = i === arr.length - 1;
      const res = [ ...acc, ...curr.split('') ];
      return isLastElem ? res : [ ...res, _delimenter ];
    }, []);

    cursorRunner(0, target, elements);
  }

  function getBrElement(): HTMLElement {
    const brElem = document.createElement('br');
    brElem.classList.add('d-inline-flex');
    return brElem;
  }

  function cursorRunner(index: number, target: HTMLElement, elements: string | HTMLElement[]): void {
    target.append(elements[index]);
    index++;
    setTimeout(
      function() {
        if (index < elements.length) {
          cursorRunner(index, target, elements);
        } else {
          return;
        }
      }, Math.floor(Math.random() * 220) + 50
    );
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
                className={styles.mainBlock__title}
              ></motion.h1>

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

        </section>
      )}
    </InView>
    )
}

export default memo(ScreenOne);
