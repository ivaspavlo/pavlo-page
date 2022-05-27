import React, { useState, useEffect } from "react";

import ButtonPrimary from "@components/button-primary/ButtonPrimary";

import styles from "./ScreenOne.module.scss";


function ScreenOne() {
  const [state, setState] = useState(false);

  useEffect(() => {
    return () => {}
  }, []);

  return (
    <section className={styles.screenOne}>
      <div className={styles.screenOne__container}>

        <div className={styles.mainBlock}>
          <h1 className={styles.mainBlock__title}>Hey there, <br className="d-none d-md-inline-flex" />It's Pavlo Ivashchenko</h1>
          <h4 className={styles.mainBlock__subtitle}>Thanks for being there and reading my gig details. As the title of the gig suggests I am a Front end Developer & offering my expertise in Angular App Website Development.</h4>
          <div className={styles.mainBlock__buttonWrap}>
            <ButtonPrimary title="Learn more" link="/" filled={true}/>
          </div>
        </div>

        <div className={styles.screenOne__decor_1}></div>
        <div className={styles.screenOne__decor_2}></div>
        <div className={styles.screenOne__decor_3}></div>

      </div>
    </section>
  );
}

export default ScreenOne;
