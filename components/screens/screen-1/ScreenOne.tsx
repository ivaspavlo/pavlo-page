import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { InView } from "react-intersection-observer";

import ButtonPrimary from "@components/button-primary/ButtonPrimary";

import styles from "./ScreenOne.module.scss";


function ScreenOne() {
  const t = useTranslations('Screen-one');
  const animateInit = { translateY: '-20%', opacity: 0 };
  const animateComplete = { translateY: 0, opacity: 1 };

  return (
    <section className={styles.screenOne}>
      <div className={styles.screenOne__container}>

        <InView threshold={0.25}>
          {({ref, inView}) => (
            <div
              ref={ref}
              className={styles.mainBlock}>

                <motion.h1
                  initial={false}
                  animate={inView ? animateComplete : animateInit}
                  transition={{ duration: .8, ease: "easeOut" }}
                  className={styles.mainBlock__title}>
                    {t("greets-1")}, <br className="d-none d-md-inline-flex" />{t("greets-2")}
                </motion.h1>

                <motion.h4
                  initial={false}
                  animate={inView ? animateComplete : animateInit}
                  transition={{ duration: .8, ease: "easeOut", delay: .5 }}
                  className={styles.mainBlock__subtitle}>
                    {t("intro-text")}
                </motion.h4>

                <motion.div
                  initial={false}
                  animate={inView ? animateComplete : animateInit}
                  transition={{ duration: .8, ease: "easeOut", delay: 1 }}
                  className={styles.mainBlock__buttonWrap}>
                    <ButtonPrimary title={t("btn-learn-more")} link="/" filled={true}/>
                </motion.div>

            </div>
          )}
        </InView>

      </div>

      <div className={styles.screenOne__decor_0}></div>
      <div className={styles.screenOne__decor_1}></div>
      <div className={styles.screenOne__decor_2}></div>
      <div className={styles.screenOne__decor_3}></div>

    </section>
  );
}

export default ScreenOne;
