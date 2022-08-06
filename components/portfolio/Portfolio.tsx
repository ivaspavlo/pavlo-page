import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { InView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

import { CONSTANTS } from '@root/constants';
import Project, { IProjectConfig } from '@components/project/Project';
import ButtonPrimary from '@components/button-primary/ButtonPrimary';

import styles from './Portfolio.module.scss';

const portfolioItems = [
  {
    id: 'project-7',
    title: 'project-7.title',
    desc: 'project-7.desc',
    codeLink: 'https://github.com/pavel-ivashchenko/massage-services-ui',
    projectImg: 'img/project-7-bg.png',
    sidebarRight: false,
    stack: ['Angular', 'Web3', 'Metamask', 'HTML5', 'CSS3']
  }, {
    id: 'project-8',
    title: 'project-8.title',
    desc: 'project-8.desc',
    codeLink: 'https://github.com/pavel-ivashchenko/diamond-boyz-ui',
    projectImg: 'img/project-8-bg.png',
    sidebarRight: false,
    stack: ['Angular', 'Web3', 'Metamask', 'HTML5', 'CSS3']
  }, {
    id: 'project-9',
    title: 'project-9.title',
    desc: 'project-9.desc',
    codeLink: 'https://github.com/pavel-ivashchenko/uptracker-v2',
    projectImg: 'img/project-9-bg.png',
    sidebarRight: false,
    liveLink: 'https://up-tracker.com/',
    stack: ['Angular', 'NgRx', 'Material', 'HTML5', 'CSS3']
  }, {
    id: 'project-10',
    title: 'project-10.title',
    desc: 'project-10.desc',
    projectImg: 'img/project-10-bg.png',
    sidebarRight: true,
    liveLink: 'https://up-tracker.com/',
    stack: ['Angular', 'Sockets.io', 'Materialize.css', 'HTML5', 'CSS3']
  }, {
    id: 'project-11',
    title: 'project-11.title',
    desc: 'project-11.desc',
    codeLink: 'https://github.com/pavel-ivashchenko/dressmenow_ui',
    projectImg: '/img/project-11-bg.png',
    sidebarRight: false,
    stack: ['Angular', 'Material', 'HTML5', 'CSS3']
  }, {
    id: 'project-12',
    title: 'project-12.title',
    desc: 'project-12.desc',
    codeLink: 'https://github.com/pavel-ivashchenko/staff-management-system',
    projectImg: '/img/project-12-bg.png',
    sidebarRight: true,
    stack: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose']
  }
];
  
function Portfolio() {
  const t = useTranslations('portfolio');
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [itemsToShow, setItemsToShow] = useState(2);

  const evenVariants = { open: { translateX: 0, opacity: 1 }, closed: { translateX: '-5%', opacity: 0 } };
  const oddVariants = { open: { translateX: 0, opacity: 1 }, closed: { translateX: '5%', opacity: 0 } };

  function onClickHandler() {
    if (itemsToShow === portfolioItems.length - 1) {
      setIsLastPage(true);
    }
    if (itemsToShow >= portfolioItems.length) {
      return;
    }
    setItemsToShow(itemsToShow + 1);
  };

  return (
    <InView threshold={0.1}>
      {({ref, inView}) => (
        <section id={CONSTANTS.sectionIds.portfolio} ref={ref} className={styles.portfolio}>
          <div className={styles.portfolio__container}>

            <motion.header
              initial={false}
              animate={inView ? 'open' : 'closed'}
              variants={{ open: { translateY: 0, opacity: 1 }, closed: { translateY: '-20%', opacity: 0 } }}
              transition={{ duration: .8, ease: 'easeOut', delay: .2 }}
              className='w-100 d-flex flex-column'>
                <h5 className={styles.portfolio__subtitle}>{t('subtitle')}</h5>
                <h3 className={styles.portfolio__title}>
                  <span>{t('title')}</span>
                  <motion.div
                    initial={false}
                    animate={inView ? 'open' : 'closed'}
                    variants={{ open: { translateX: 0, translateY: 0, opacity: 1 }, closed: { translateX: '-30%', translateY: '40%', opacity: 0 } }}
                    transition={{ duration: .5, delay: 1 }}
                    className='ml-2 d-inline-flex'
                  >🚀</motion.div>
                </h3>
            </motion.header>

            <ul className='w-100'>
              {portfolioItems.slice(0, itemsToShow).map((item: IProjectConfig, index: number) =>
                <motion.li
                  key={item.id}
                  initial={false}
                  animate={inView ? 'open' : 'closed'}
                  variants={index/2 > 0 ? oddVariants : evenVariants}
                  transition={{ duration: .5 }}>
                    <Project index={index} config={item} />
                </motion.li>
              )}
            </ul>
            
            <div className='w-100 position-relative d-flex justify-content-center'>
              <p className={`${styles.portfolio__buttonPlaceholder} ${isLastPage ? styles.visible : styles.hidden}`}>{t('no-projects')} 🙈</p>
              <div className={`${styles.portfolio__buttonContainer} ${isLastPage ? styles.hidden : styles.visibl}`}>
                <ButtonPrimary onClick={onClickHandler} title={t('see-more')} filled={true}/>
              </div>
            </div>

          </div>
        </section>
      )}
    </InView>
  );
}
    
export default Portfolio;
    