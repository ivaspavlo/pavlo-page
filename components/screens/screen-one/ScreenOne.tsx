import React from "react";
import { useTranslations } from "next-intl";

import ButtonPrimary from "@components/button-primary/ButtonPrimary";

import styles from "./ScreenOne.module.scss";


function ScreenOne() {
  const t = useTranslations('Screen-one');

  return (
    <section className={styles.screenOne}>
      <div className={styles.screenOne__container}>

        <div className={styles.mainBlock}>
          <h1 className={styles.mainBlock__title}>{t("greets-1")}, <br className="d-none d-md-inline-flex" />{t("greets-2")}</h1>
          <h4 className={styles.mainBlock__subtitle}>{t("intro-text")}</h4>
          <div className={styles.mainBlock__buttonWrap}>
            <ButtonPrimary title={t("btn-learn-more")} link="/" filled={true}/>
          </div>
        </div>

      </div>

      <div className={styles.screenOne__decor_0}></div>
      <div className={styles.screenOne__decor_1}></div>
      <div className={styles.screenOne__decor_2}></div>
      <div className={styles.screenOne__decor_3}></div>

    </section>
  );
}

export default ScreenOne;
