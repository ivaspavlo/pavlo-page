import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { InView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

import { CONSTANTS } from '@root/constants';
import Project, { IProject } from '@components/project/Project';

import styles from './ScreenFive.module.scss';


const projects: { page: number; items: IProject[] }[] = [
  {
    page: 0,
    items: [
      {
        id: 'project_1',
        title: 'Jewelry Website',
        desc: 'Professionally deliver world-class process improvements after team driven scenarios.',
        codeLink: '/',
        bgColor: '#A8AAFF',
        projectImg: 'img/project-mock-img.png',
        sidebarTitle: 'Movie Time IOS App Development',
        sidebarBg: 'img/sidebar-1-bg.png',
        sidebarRight: true,
        liveLink: '/'
      }, {
        id: 'project_2',
        title: 'Jewelry Website',
        desc: 'Professionally deliver world-class process improvements after team driven scenarios.',
        codeLink: '/',
        bgColor: '#FBFFD0',
        projectImg: 'img/project-mock-img.png',
        sidebarTitle: 'Movie Time IOS App Development',
        sidebarBg: 'img/sidebar-2-bg.png',
        sidebarRight: false,
        liveLink: '/'
      }
    ]
  }, {
    page: 1,
    items: [
      {
        id: 'project_3',
        title: 'Jewelry Website',
        desc: 'Professionally deliver world-class process improvements after team driven scenarios.',
        codeLink: '/',
        bgColor: '#8CB6FF',
        projectImg: 'img/project-mock-img.png',
        sidebarTitle: 'Movie Time IOS App Development',
        sidebarBg: 'img/sidebar-3-bg.png',
        sidebarRight: true,
        liveLink: '/'
      }
    ]
  }
];
  
function ScreenFive() {
  const t = useTranslations('screen-five');

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [visibleProjects, setVisibleProjects] = useState<IProject[]>([]);
  const [showMoreButtonClicked, setShowMoreButtonClicked] = useState<boolean>(false);

  useEffect(() => {
    setVisibleProjects(projects[currentPage].items);
  }, []);

  const evenVariants = { open: { translateX: 0, opacity: 1 }, closed: { translateX: '-5%', opacity: 0 } };
  const oddVariants = { open: { translateX: 0, opacity: 1 }, closed: { translateX: '5%', opacity: 0 } };

  function onClickHandler() {
    const nextPage = currentPage + 1;
    if (nextPage > projects.length - 1) {
      return;
    }
    if (!showMoreButtonClicked) {
      setShowMoreButtonClicked(true);
    }
    setCurrentPage(nextPage);
    setVisibleProjects([ ...visibleProjects, ...projects[nextPage].items ]);
  };

  return (
    <InView threshold={0.25}>
      {({ref, inView}) => (
        <section id={CONSTANTS.sectionIds.sectionFive} ref={ref} className={`${styles.screenFive} ${showMoreButtonClicked ? styles.screenFive_snapAlignEnd : ''}`}>
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

            <ul>
              {visibleProjects.map((projectConfig: IProject, index: number) =>
                <motion.li
                  key={projectConfig.id}
                  initial={false}
                  animate={inView ? 'open' : 'closed'}
                  variants={index/2 > 0 ? oddVariants : evenVariants}
                  transition={{ duration: .5, delay: index / 3 }}>
                    <Project config={projectConfig} />
                </motion.li>
              )}
            </ul>
            
            <div className='w-100 d-flex justify-content-center'>
              <button onClick={onClickHandler} className={styles.screenFive__button}>{t('see-more')}</button>
            </div>

          </div>
        </section>
      )}
    </InView>
  );
}
    
export default ScreenFive;
    