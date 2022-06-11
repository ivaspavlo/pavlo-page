import React, { ReactNode, RefObject, useRef } from "react";

import Header from "@components/header/Header";
import Footer from "@components/footer/Footer";

import styles from "@components/layout/Layout.module.scss";


function Layout({ children }: { children: ReactNode; }) {
  const layoutRef: RefObject<HTMLDivElement> = useRef(null);

  return (
    <div ref={layoutRef} className={styles.layoutContainer}>

      <Header scrollOrigin={layoutRef} />

      {children}

      <Footer />
      
    </div>
  );
};

export default Layout;
