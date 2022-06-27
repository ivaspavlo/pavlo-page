import React from 'react';
import { useTranslations } from 'next-intl';
import { InView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

import { CONSTANTS } from '@root/constants';

import styles from './ScreenFive.module.scss';


const projects = [
  {
    title: 'Jewelry Website',
    desc: 'Professionally deliver world-class process improvements after team driven scenarios.',
    codeLink: '/',
    projectImg: '~/img/project-mock-img.png',
    projectType: 'Movie Time IOS App Development',
    sidebarBg: '~/img/project-mock-img.png',
    mainBgColor: '#A8AAFF',
    liveLink: '/',
    sidebarLeft: true
  }, {
    title: 'Jewelry Website',
    desc: 'Professionally deliver world-class process improvements after team driven scenarios.',
    codeLink: '/',
    projectImg: '~/img/project-mock-img.png',
    projectType: 'Movie Time IOS App Development',
    sidebarBg: '~/img/project-mock-img.png',
    mainBgColor: '#A8AAFF',
    liveLink: '/',
    sidebarLeft: true
  }, {
    title: 'Jewelry Website',
    desc: 'Professionally deliver world-class process improvements after team driven scenarios.',
    codeLink: '/',
    projectImg: '~/img/project-mock-img.png',
    projectType: 'Movie Time IOS App Development',
    sidebarBg: '~/img/project-mock-img.png',
    mainBgColor: '#A8AAFF',
    liveLink: '/',
    sidebarLeft: true
  }
];
  
function ScreenFive() {
  const t = useTranslations('screen-five');
    
  return (
    <InView threshold={0.25}>
      {({ref, inView}) => (
        <section id={CONSTANTS.sectionIds.sectionFive} ref={ref} className={styles.screenFive}>
          <div className={styles.screenFive__container}>

            <motion.header
              initial={false}
              animate={inView ? "open" : "closed"}
              variants={{ open: { translateY: 0, opacity: 1 }, closed: { translateY: '-20%', opacity: 0 } }}
              transition={{ duration: .8, ease: "easeOut", delay: .2 }}
              className="w-100 d-flex flex-column">
                <h5 className={styles.screenFive__subtitle}>{t("subtitle")}</h5>
                <div className="w-100 mt-2 d-flex flex-column flex-md-row justify-content-md-between">
                  <h3 className={styles.screenFive__title}>
                    <span>{t("title")}</span>
                    <motion.div
                      initial={false}
                      animate={inView ? "open" : "closed"}
                      variants={{ open: { translateX: 0, opacity: 1 }, closed: { translateX: '-40%', opacity: 0 } }}
                      transition={{ duration: .5, delay: 1 }}
                      className="ml-2 d-inline-flex"
                    >🚀</motion.div>
                  </h3>
                </div>
            </motion.header>

            <ul>
              
            </ul>

          </div>
        </section>
      )}
    </InView>
  );
}
    
export default ScreenFive;
    