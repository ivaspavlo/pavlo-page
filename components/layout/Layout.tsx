import React, { useState, useEffect } from "react";
import { ParallaxProvider } from "react-scroll-parallax";

import Header from "@components/header/Header";
import Footer from "@components/footer/Footer";
import ScreenOne from "@components/screens/screen-one/ScreenOne";
import ScreenTwo from "@components/screens/screen-two/screenTwo";

import classes from "@components/layout/Layout.module.scss";


function Layout() {
  const [state, setState] = useState(false);

  useEffect(() => { }, []);

  return (
    <ParallaxProvider>

      <Header />

      <ScreenOne />

      <ScreenTwo />

      <Footer />
      
    </ParallaxProvider>
  );
}
    
export default Layout;
