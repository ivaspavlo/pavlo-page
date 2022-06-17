import React from "react";
import { InView } from "react-intersection-observer";
import { useTranslations } from "next-intl";

import styles from "@components/footer/Footer.module.scss";


const socialLinks = [
  { iconName: 'facebook', link: '/' },
  { iconName: 'instagram', link: '/' },
  { iconName: 'linkedin', link: '/' },
];

const acchorLinks = [
  { uiName: 'about', scrollTo: '' },
  { uiName: 'resume', scrollTo: '' },
  { uiName: 'porfolio', scrollTo: '' }
];

function Footer() {
  const t = useTranslations('screen-three');

  return (
    <InView threshold={0.25}>
      {({ref, inView}) => (
        <section ref={ref} className={styles.screenThree}>

          

        </section>
      )}
    </InView>
  );
}

export default Footer;
