import React, { MutableRefObject, ReactNode, RefObject, useRef } from "react";
import { ParallaxProvider } from "react-scroll-parallax";

import Header from "@components/header/Header";
import Footer from "@components/footer/Footer";

import styles from "@components/layout/Layout.module.scss";


function Layout({ children }: { children: ReactNode; }) {
  const layoutContainer = useRef<HTMLDivElement>(null);

  return (
    <ParallaxProvider>

      <div ref={layoutContainer} className={styles.layoutContainer}>
        
        <Header scrollTarget={layoutContainer} />

        {children}

        <Footer />

      </div>
      
    </ParallaxProvider>
  );
}
    
export default Layout;
