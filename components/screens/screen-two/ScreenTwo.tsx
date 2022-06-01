import React from "react";
import { useTranslations } from "next-intl";

import ButtonSecondary from "@components/button-secondary/ButtonSecondary";
import ButtonPrimary from "@components/button-primary/ButtonPrimary";

import styles from "./ScreenTwo.module.scss";


function ScreenTwo() {
  const t = useTranslations('Screen-two');
  const age = getCurrentAge();

  function getCurrentAge() {
    const birthYear = 1988;
    const birthMonth = 7;
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    return currentYear - birthYear - (currentMonth - birthMonth < 0 ? 1 : 0);
  }

  return (
    <section className={styles.screenTwo}>

      <div className={styles.screenTwo__container}>

        <div className={styles.myImageDesktop}></div>

        <div className={styles.mainBlock}>
          <header className={styles.mainBlock__header}>
            <h5 className={styles.mainBlock__subtitle}>{t('subtitle')}</h5>
            <h3 className={styles.mainBlock__title}>{t('title')} 👋</h3>
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
        </div>

      </div>

      <div className={styles.myImageMobile}></div>

    </section>
  );
}

export default ScreenTwo;
