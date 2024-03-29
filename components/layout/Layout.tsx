import React, { ReactNode } from 'react';
import { CONSTANTS } from '@root/constants';
import styles from '@components/layout/Layout.module.scss';


function Layout({ children }: { children: ReactNode; }) {
  return (
    <div id={CONSTANTS.sectionIds.scrollOrigin} className={styles.layout}>

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
