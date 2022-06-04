import React from "react";
import { useTranslations } from "next-intl";

import styles from "./ScreenThree.module.scss";


const serviceCards = [
  { iconName: 'service-web-dev', title: 'service-web-title', desc: 'service-web-desc' },
  { iconName: 'service-app-dev', title: 'service-app-title', desc: 'service-app-desc' },
  { iconName: 'service-desk-dev', title: 'service-desk-title', desc: 'service-desk-desc' }
];

function screenThree() {
  const t = useTranslations('Screen-three');

  return (
    <section className={styles.screenThree}>
      <div className={styles.screenThree__container}>

        <h5 className={styles.screenThree__subtitle}>{t("subtitle")}</h5>
        <h3 className={styles.screenThree__title}>{t("title")} 🛠</h3>
        <p className={styles.screenThree__desc}>{t("desc")}</p>

        <ul className={styles.screenThree__cards}>
          {serviceCards.map(card => <li key={card.title} className={styles.serviceCard}>
            <div className={styles.serviceCard__icon}>
              <img src={`/icons/${card.iconName}.svg`} alt={`Icon: ${t(card.title)}`} />
            </div>
            <h4 className={styles.serviceCard__title}>{t(card.title)}</h4>
            <p className={styles.serviceCard__desc}>{t(card.desc)}</p>
          </li>)}
        </ul>

      </div>
    </section>
  );
}
    
export default screenThree;
    