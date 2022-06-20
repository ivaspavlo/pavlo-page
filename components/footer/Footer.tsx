import React from "react";
import { InView } from "react-intersection-observer";
import { useTranslations } from "next-intl";

import { CONSTANTS } from "@root/constants";
import styles from "@components/footer/Footer.module.scss";
import Icon from "@components/icon/Icon";


const socialLinks = [
  { iconName: 'facebook', link: '/' },
  { iconName: 'instagram', link: '/' },
  { iconName: 'linkedin-white', link: '/' },
];

const contacts = [
  { iconName: 'email', uiName: 'ivashchenko.pavel@gmail.com' },
  { iconName: 'linkedin-black', uiName: 'https://www.linkedin.com/in/pavloiv/' },
  { iconName: 'telegram', uiName: '@pavlo-ivashchenko' }
];

const anchorLinks = [
  { uiName: 'anchor-about', scrollToId: CONSTANTS.sectionIds.sectionOne },
  { uiName: 'anchor-resume', scrollToId: CONSTANTS.sectionIds.sectionOne },
  { uiName: 'anchor-portfolio', scrollToId: CONSTANTS.sectionIds.sectionOne }
];

function Footer() {
  const t = useTranslations('footer');

  const onClickAnchor = (scrollToId: string) => {
    console.log(scrollToId);
  }

  return (
    <InView threshold={0.25}>
      {({ref, inView}) => (
        <section ref={ref} className={styles.footer}>

          <div className={styles.footerContent}>

            <div className={styles.footerContent__column}>
              <h3 className={styles.footerContent__title}>
                <span>{t('contact')}</span>
                <br />
                <span>{t('me')}</span>
                <div className="d-inline-flex ml-2">👋</div>
              </h3>
              <p className={styles.footerContent__desc}>{t('desc')}</p>
              <ul className="d-flex flex-column">
                {contacts.map(item =>
                  <li key={item.uiName} className={styles.contactItem}>
                    <div className={styles.contactItem__icon}>
                      <Icon name={item.iconName}></Icon>
                    </div>
                    <p className={styles.contactItem__name}>{item.uiName}</p>
                  </li>
                )}
              </ul>
            </div>
  
            <form className={styles.footerContent__column}>
              <h4>{t('form-header')}</h4>
              
            </form>

          </div>

          <div className={styles.bottomLine}>
            <div className={styles.bottomLine__content}>

              <h5 className={styles.bottomLine__title}>{t('bottom-line-title')}</h5>

              <div className="d-flex flex-column flex-md-row">
                <ul className="mt-3 mt-md-0 d-flex justify-content-center align-items-center">
                  {anchorLinks.map((item, index) =>
                    <li key={item.uiName} className="mx-3">
                      <a className={styles.bottomLine__anchorLink} onClick={() => onClickAnchor(item.scrollToId)}>{t(item.uiName)}</a>
                    </li>
                  )}
                </ul>
                <ul className="mt-3 mt-md-0 d-flex justify-content-center align-items-center">
                  {socialLinks.map((item, index) =>
                    <li key={item.link} className={`${index ? 'ml-2': ''}`}>
                      <a className={styles.bottomLine__socialLink} href={item.link} target="_blank">
                        <Icon name={item.iconName}></Icon>
                      </a>
                    </li>
                  )}
                </ul>
              </div>

            </div>
          </div>

        </section>
      )}
    </InView>
  );
}

export default Footer;
