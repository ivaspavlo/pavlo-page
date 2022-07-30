import React, { ReactNode, RefObject, useRef } from 'react';
import { CONSTANTS } from '@root/constants';
import Header from '@components/header/Header';
import styles from '@components/layout/Layout.module.scss';


function Layout({ children }: { children: ReactNode; }) {
  const layoutRef: RefObject<HTMLDivElement> = useRef(null);

  return (
    <div id={CONSTANTS.sectionIds.scrollOrigin} ref={layoutRef} className={styles.layout}>

      <Header scrollOrigin={layoutRef} />

      {children}

      <div className={styles.layoutBackground}>
        <div className={styles.layoutBackground__decor_1}></div>
        <div className={styles.layoutBackground__decor_2}></div>
        <div className={styles.layoutBackground__decor_3}></div>
      </div>

    </div>
  );
};

export default Layout;
