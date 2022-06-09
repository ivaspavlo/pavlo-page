import React, { createContext, ReactNode, RefObject, useEffect, useRef, useState } from "react";

import Header from "@components/header/Header";
import Footer from "@components/footer/Footer";

import styles from "@components/layout/Layout.module.scss";

export const LayoutContext = createContext<RefObject<any> | null>(null);


function Layout({ children }: { children: ReactNode; }) {
  const layoutRef: RefObject<HTMLDivElement> = useRef(null);
  const [layoutRefState, setLayoutRefState] = useState<any>(null);

  useEffect(() => {
    if (!layoutRef.current) {
      return;
    }
    setLayoutRefState(layoutRef);
  }, [layoutRef]);

  return (
    <div ref={layoutRef} className={styles.layoutContainer}>
      <LayoutContext.Provider value={layoutRefState}>

        <Header />

        {children}

        <Footer />

      </LayoutContext.Provider>
    </div>
  );
};

export default Layout;
