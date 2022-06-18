import React from "react";
import { InView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { CONSTANTS } from "@root/constants";
import ButtonPrimary from "@components/button-primary/ButtonPrimary";
import ButtonSecondary from "@components/button-secondary/ButtonSecondary";
import Icon from "@components/icon/Icon";

import styles from "./ScreenFour.module.scss";


const experienceCards = [
  {
    starYear: 2018,
    endYear: 2019,
    iconName: 'itrex-logo',
    company: 'ITRex Group',
    location: 'location-kyiv',
    position: 'position-node',
    desc: 'desc-temp'
  }, {
    starYear: 2019,
    endYear: 2020,
    iconName: 'itrex-logo',
    company: 'ITRex Group',
    location: 'location-kyiv',
    position: 'position-angular',
    desc: 'desc-temp'
  }, {
    starYear: 2020,
    endYear: null,
    iconName: 'greentube-logo',
    company: 'Greentube Internet Entertainment Solutions GmbH',
    location: 'location-kyiv',
    position: 'position-angular',
    desc: 'desc-temp'
  }
];

const educationCards = [
  { title: 'politech-title', school: 'politech-school', years: '2015-2017' },
  { title: 'pedagogic-title', school: 'pedagogic-school', years: '2016-2019' },
  { title: 'economic-title', school: 'economic-school', years: '2016-2019' }
];

const skillCards = [
  'HTML', 'CSS', 'Angular', 'Node.js', 'JavaScript', 'Sass'
];

const toolCards = [
  'visual-studio', 'figma', 'slack'
];

function screenFour() {
  const t = useTranslations('screen-four');

  return (
    <InView threshold={0.10}>
      {({ref, inView}) => (
        <section id={CONSTANTS.sectionIds.sectionFour} ref={ref} className={styles.screenFour}>
          <div className={styles.screenFour__container}>

            <motion.header
              initial={false}
              animate={inView ? "open" : "closed"}
              variants={{
                open: { translateY: 0, opacity: 1 },
                closed: { translateY: '-20%', opacity: 0 }
              }}
              transition={{ duration: .8, ease: "easeOut", delay: .2 }}
              className="w-100 d-flex flex-column">
                <h5 className={styles.screenFour__subtitle}>{t("subtitle")}</h5>
                <div className="w-100 mt-2 d-flex flex-column flex-md-row justify-content-md-between">
                  <h3 className={styles.screenFour__title}>
                    <span>{t("title")}</span>
                    <motion.div
                      initial={false}
                      animate={inView ? "open" : "closed"}
                      variants={{
                        open: { translateX: 0, opacity: 1 },
                        closed: { translateX: '-40%', opacity: 0 }
                      }}
                      transition={{ duration: .5, delay: 1 }}
                      className="ml-2 d-inline-flex"
                    >😏</motion.div>
                  </h3>
                  <p className={styles.screenFour__desc}>{t("desc")}</p>
                </div>
            </motion.header>

            <div className="d-flex flex-column flex-md-row">
              <div className={styles.screenFour__cardsColumn}>
                <h4 className={styles.screenFour__columnTitle}>{t("experience")}</h4>
                <ul>
                  {experienceCards.map((card, index) => 
                    <motion.li
                      initial={false}
                      animate={inView ? "open" : "closed"}
                      variants={{
                        open: { translateX: 0, opacity: 1 },
                        closed: { translateX: '-10%', opacity: 0 }
                      }}
                      transition={{ duration: .3, delay: index / 3 }}
                      key={card.position + index}
                      className={styles.xCard}>
                        <p className={styles.xCard__years}>
                          <span className={`${styles.screenFour__bullet} mr-2`}></span>
                          <span>{card.starYear}</span>
                          <span className="mx-2">-</span>
                          <span>{card.endYear || '...'}</span>
                        </p>
                        <div className="d-flex flex-column flex-grow-1">
                          <h6 className={styles.xCard__position}>{t(card.position)}</h6>
                          <div className="d-flex align-items-start ">
                            <div className={styles.xCard__companyLogo}>
                              <Icon width={32} height={32} name={card.iconName}></Icon>
                            </div>
                            <div className="ml-3">
                              <p className={styles.xCard__company}>{card.company}</p>
                              <p className={styles.xCard__location}>{t(card.location)}</p>
                            </div>
                          </div>
                          <p className={styles.xCard__desc}>{t(card.desc)}</p>
                        </div>
                    </motion.li>
                  )}
                </ul>
              </div>
              <div className={styles.screenFour__educationColumn}>
                <h4 className={styles.screenFour__columnTitle}>{t("education")}</h4>
                <ul>
                  {educationCards.map(card => 
                    <motion.li className={styles.edCard}>
                      <h6 className={styles.edCard__title}>
                        <span className={styles.edCard__bullet}></span>
                        <span>{t(card.title)}</span>
                      </h6>
                      <p className={styles.edCard__school}>{t(card.school)}</p>
                      <p className={styles.edCard__years}>{card.years}</p>
                    </motion.li>
                  )}
                </ul>
                <h4 className={styles.screenFour__skillsTitle}>{t("skills")}</h4>
                <ul className="d-flex flex-wrap">
                  {skillCards.map(card =>
                    <motion.li className={styles.skillCard}>{card}</motion.li>
                  )}
                </ul>
                <h4 className={styles.screenFour__toolsTitle}>{t("tools")}</h4>
                <ul className="d-flex flex-wrap">
                  {toolCards.map(card =>
                    <motion.li className={styles.toolCard}>
                      <Icon name={card} width={20} height={20}></Icon>
                    </motion.li>
                  )}
                </ul>
              </div>
            </div>

            <div className={styles.screenFour__controls}>
              <div className={styles.screenFour__buttonWrap}>
                <ButtonPrimary title={t('btn-contact')} link="/" filled={true}/>
              </div>
              <div className={styles.screenFour__buttonWrap}>
                <ButtonSecondary title={t('btn-cv')} link="/" />
              </div>
            </div>

          </div>
        </section>
      )}
    </InView>
  );
}

export default screenFour;
