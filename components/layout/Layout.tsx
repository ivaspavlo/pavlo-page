import React from "react";
import { ParallaxProvider } from "react-scroll-parallax";

import Header from "@components/header/Header";
import Footer from "@components/footer/Footer";

import styles from "@components/layout/Layout.module.scss";


function Layout({ children }: { children: any; }) {
  return (
    <ParallaxProvider>

      <div className={styles.layoutContainer}>
        
        <Header />

        {children}

        <Footer />

      </div>
      
    </ParallaxProvider>
  );
}
    
export default Layout;
