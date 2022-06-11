import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

import ButtonSecondary from "@components/button-secondary/ButtonSecondary";
import ButtonPrimary from "@components/button-primary/ButtonPrimary";

import styles from "./ScreenTwo.module.scss";
import { InView } from "react-intersection-observer";


function ScreenTwo() {
  const t = useTranslations('Screen-two');
  const age = getCurrentAge();
  const animate = {
    open: { translateY: 0, opacity: 1 },
    closed: { translateY: '-5%', opacity: 0 }
  }

  function getCurrentAge() {
    const birthYear = 1988;
    const birthMonth = 7;
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    return currentYear - birthYear - (currentMonth - birthMonth < 0 ? 1 : 0);
  }

  return (
    <section className={styles.screenTwo}>

        <InView threshold={0.25}>
          {({ref, inView}) => (
            <div ref={ref} className={styles.screenTwo__container}>

              <motion.div
                initial={false}
                animate={inView ? { opacity: 1 } : { opacity: 0}}
                transition={{ duration: 1, ease: "easeOut" }}
                className={styles.myImage}
              ></motion.div>
      
              <motion.div
                initial={false}
                animate={inView ? "open" : "closed"}
                variants={animate}
                transition={{ duration: .8, ease: "easeOut", delay: .2 }}
                className={styles.mainBlock}>
                  <header className={styles.mainBlock__header}>
                    <h5 className={styles.mainBlock__subtitle}>{t('subtitle')}</h5>
                    <h3 className={styles.mainBlock__title}>
                      <span>{t('title')}</span>
                      <motion.div
                        initial={false}
                        animate={inView ? { scale: [1,1.2,1.2,1], rotate: [0,-30,30,0] } : { scale: 1 }}
                        transition={{ duration: .7, delay: 1 }}
                        className="ml-2 d-inline-flex"
                      >👋</motion.div>
                    </h3>
                  </header>
                  <p className={styles.mainBlock__desc}>{t('desc')}</p>
                  <div className="w-100 d-flex flex-column flex-lg-row">
                    <div className="mr-4 d-flex flex-column">
                      <p className={styles.mainBlock__myInfo}><b>{t('name-title')}:</b>{t('name')}</p>
                      <p className={styles.mainBlock__myInfo}><b>{t('age-title')}:</b>{age}</p>
                    </div>
                    <div className="d-flex flex-column">
                      <p className={styles.mainBlock__myInfo}>
                        <b>{t('email-title')}:</b>
                        <span className={styles.mainBlock__myInfo_email}>{t('email')}</span>
                      </p>
                      <p className={styles.mainBlock__myInfo}><b>{t('location-title')}:</b>{t('location')}</p>
                    </div>
                  </div>
                  <div className={styles.mainBlock__controls}>
                    <div className={styles.mainBlock__buttonWrap}>
                      <ButtonPrimary title={t('btn-experience')} link="/" filled={true}/>
                    </div>
                    <div className={styles.mainBlock__buttonWrap}>
                      <ButtonSecondary title={t('btn-cv')} link="/" />
                    </div>
                  </div>
              </motion.div>
              
            </div>
          )}
        </InView>

    </section>
  );
}

export default ScreenTwo;
