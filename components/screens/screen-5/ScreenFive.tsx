import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useTranslations } from 'next-intl';
import { InView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

import { CONSTANTS } from '@root/constants';
import Project, { IProjectConfig } from '@components/project/Project';
import ButtonPrimary from '@components/button-primary/ButtonPrimary';

import styles from './ScreenFive.module.scss';


const projects: { page: number; items: IProjectConfig[] }[] = [
  {
    page: 0,
    items: [
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
      }
    ]
  }, {
    page: 1,
    items: [
      {
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
      }
    ]
  }, {
    page: 2,
    items: [
      {
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
    ]
  }
];
  
function ScreenFive() {
  const t = useTranslations('screen-five');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [visibleProjects, setVisibleProjects] = useState<IProjectConfig[]>([]);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [isFirstRender, setIsFirstRender] = useState<boolean>(false);

  useEffect(() => {
    setVisibleProjects(projects[currentPage].items);
    setIsFirstRender(false);
  }, []);

  useEffect(() => {
    if (isFirstRender) {
      return;
    }
    document.getElementById(CONSTANTS.sectionIds.sectionFive)?.scrollIntoView({ block: 'end' });
  }, [visibleProjects]);

  const evenVariants = { open: { translateX: 0, opacity: 1 }, closed: { translateX: '-5%', opacity: 0 } };
  const oddVariants = { open: { translateX: 0, opacity: 1 }, closed: { translateX: '5%', opacity: 0 } };

  function onClickHandler() {
    const nextPage = currentPage + 1;
    if (isLastPage) {
      return;
    }
    if (nextPage === projects.length - 1) {
      setIsLastPage(true);
    }
    setCurrentPage(nextPage);
    setVisibleProjects([ ...visibleProjects, ...projects[nextPage].items ]);
  };

  return (
    <InView threshold={0.1}>
      {({ref, inView}) => (
        <section id={CONSTANTS.sectionIds.sectionFive} ref={ref} className={styles.screenFive}>
          <div className={styles.screenFive__container}>

            <motion.header
              initial={false}
              animate={inView ? 'open' : 'closed'}
              variants={{ open: { translateY: 0, opacity: 1 }, closed: { translateY: '-20%', opacity: 0 } }}
              transition={{ duration: .8, ease: 'easeOut', delay: .2 }}
              className='w-100 d-flex flex-column'>
                <h5 className={styles.screenFive__subtitle}>{t('subtitle')}</h5>
                <h3 className={styles.screenFive__title}>
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
              {visibleProjects.map((projectConfig: IProjectConfig, index: number) =>
                <motion.li
                  key={projectConfig.id}
                  initial={false}
                  animate={inView ? 'open' : 'closed'}
                  variants={index/2 > 0 ? oddVariants : evenVariants}
                  transition={{ duration: .5, delay: isFirstRender ? index / 3 : 0 }}>
                    <Project index={index} config={projectConfig} />
                </motion.li>
              )}
            </ul>
            
            <div className={styles.screenFive__button}>
              {isLastPage ?
                <p>That's all for now 🙈</p> :
                <ButtonPrimary onClick={onClickHandler} title={t('see-more')} filled={true}/>}
            </div>

          </div>
        </section>
      )}
    </InView>
  );
}
    
export default ScreenFive;
    