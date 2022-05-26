import React, { useState, useEffect } from "react";
import { ParallaxProvider } from "react-scroll-parallax";

import Header from "@components/header/Header";
import ScreenOne from "@components/screens/screen-one/ScreenOne";
import Footer from "@components/footer/Footer";

import classes from "@components/layout/Layout.module.scss";


function Layout() {
  const [state, setState] = useState(false);

  useEffect(() => { }, []);

  return (
    <ParallaxProvider>

      <Header />

      <ScreenOne />

      <Footer />
      
    </ParallaxProvider>
  );
}
    
export default Layout;
