import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { InView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

import { CONSTANTS } from '@root/constants';
import Project, { IProject } from '@components/project/Project';

import styles from './ScreenFive.module.scss';
import ButtonPrimary from '@root/components/button-primary/ButtonPrimary';


const projects: { page: number; items: IProject[] }[] = [
  {
    page: 0,
    items: [
      {
        id: 'project1',
        title: 'Jewelry Website',
        desc: 'Professionally deliver world-class process improvements after team driven scenarios.',
        codeLink: '/',
        bgColor: '#A8AAFF',
        projectImg: 'img/project-mock-img.png',
        sidebarTitle: 'Front-end Angular Development',
        sidebarBg: 'img/sidebar-1-bg.png',
        sidebarRight: true,
        liveLink: '/'
      }
    ]
  }, {
    page: 1,
    items: [
      {
        id: 'project3',
        title: 'Jewelry Website',
        desc: 'Professionally deliver world-class process improvements after team driven scenarios.',
        codeLink: '/',
        bgColor: '#8CB6FF',
        projectImg: 'img/project-mock-img.png',
        sidebarTitle: 'Movie Time IOS App Development',
        sidebarBg: 'img/sidebar-3-bg.png',
        sidebarRight: true,
        liveLink: '/'
      }, {
        id: 'project2',
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
  }
];
  
function ScreenFive() {
  const t = useTranslations('screen-five');

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [visibleProjects, setVisibleProjects] = useState<IProject[]>([]);
  const [snapAlignBottom, setSnapAlignBottom] = useState<boolean>(false);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);

  useEffect(() => {
    setVisibleProjects(projects[currentPage].items);
  }, []);

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
    setSnapAlignBottom(true);
    setCurrentPage(nextPage);
    setVisibleProjects([ ...visibleProjects, ...projects[nextPage].items ]);
  };

  return (
    <InView threshold={0.25}>
      {({ref, inView}) => (
        <section id={CONSTANTS.sectionIds.sectionFive} ref={ref} className={`${styles.screenFive} ${snapAlignBottom ? styles.screenFive_snapAlignEnd : ''}`}>
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
            
            <div className={styles.screenFive__button}>
              <ButtonPrimary onClick={onClickHandler} title={t('see-more')} filled={true} disabled={isLastPage}/>
            </div>

          </div>
        </section>
      )}
    </InView>
  );
}
    
export default ScreenFive;
    