import React from "react";
import { useTranslations } from "next-intl";
import { InView } from "react-intersection-observer";
import { motion } from "framer-motion";

import { CONSTANTS } from "@root/constants";
import styles from "./ScreenThree.module.scss";


const serviceCards = [
  { iconName: 'service-fe-dev', title: 'service-fe-title', desc: 'service-fe-desc' },
  { iconName: 'service-app-dev', title: 'service-app-title', desc: 'service-app-desc' },
  { iconName: 'service-be-dev', title: 'service-be-title', desc: 'service-be-desc' }
];

function ScreenThree() {
  const t = useTranslations('screen-three');
  const animateVariants = {
    open: { translateY: 0, opacity: 1 },
    closed: { translateY: '-20%', opacity: 0 }
  };

  return (
    <InView threshold={0.25}>
      {({ref, inView}) => (
        <section id={CONSTANTS.sectionIds.sectionThree} ref={ref} className={styles.screenThree}>
          <div className={styles.screenThree__container}>

            <motion.div
              initial={false}
              animate={inView ? "open" : "closed"}
              variants={animateVariants}
              transition={{ duration: .8, ease: "easeOut" }}
              className="d-flex flex-column align-items-start align-items-md-center">
                <h5 className={styles.screenThree__subtitle}>{t("subtitle")}</h5>
                <h3 className={styles.screenThree__title}>
                  <span>{t("title")}</span>
                  <motion.div
                    initial={false}
                    animate={inView ? "open" : "closed"}
                    variants={{
                      open: { scale: 1, opacity: 1 },
                      closed: { scale: 3, opacity: 0 }
                    }}
                    transition={{ duration: .2, ease: "easeOut", delay: 1.7 }}
                    className="ml-2 d-inline-flex"
                  >🛠</motion.div>
                </h3>
                <p className={styles.screenThree__desc}>{t("desc")}</p>
            </motion.div>

            <ul className={styles.screenThree__cards}>
              {serviceCards.map((card, index) =>
                <motion.li
                  initial={false}
                  animate={inView ? "open" : "closed"}
                  variants={animateVariants}
                  transition={{ duration: .3, delay: index / 3 }}
                  key={card.title}
                  className={`${styles.serviceCard} ${inView ? styles.serviceCard_inView : ''}`}>
                    <div className={styles.serviceCard__icon}>
                      <img src={`/icons/${card.iconName}.svg`} alt={`Icon: ${t(card.title)}`} />
                    </div>
                    <h4 className={styles.serviceCard__title}>{t(card.title)}</h4>
                    <p className={styles.serviceCard__desc}>{t(card.desc)}</p>
                </motion.li>
              )}
            </ul>

          </div>
        </section>
      )}
    </InView>
  );
}
    
export default ScreenThree;
    