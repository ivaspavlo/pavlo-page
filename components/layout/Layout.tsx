import React from "react";
import { ParallaxProvider } from "react-scroll-parallax";

import Header from "@components/header/Header";
import Footer from "@components/footer/Footer";

import classes from "@components/layout/Layout.module.scss";


function Layout({ children }: { children: any; }) {
  return (
    <ParallaxProvider>

      <Header />

      {children}

      <Footer />
      
    </ParallaxProvider>
  );
}
    
export default Layout;
