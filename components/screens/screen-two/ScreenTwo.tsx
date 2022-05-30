import React, { useState, useEffect } from "react";
import ButtonSecondary from "@components/button-secondary/ButtonSecondary";
import ButtonPrimary from "@components/button-primary/ButtonPrimary";
import styles from "./ScreenTwo.module.scss";


function ScreenTwo() {
  const [state, setState] = useState(false);

  useEffect(() => {
    return () => {}
  }, []);

  return (
    <section className={styles.screenTwo}>
      <div className={styles.screenTwo__container}>

        <div className={styles.screenTwo__myImage}></div>

        <div className={styles.mainBlock}>
          <header className={styles.mainBlock__header}>
            <h5 className={styles.mainBlock__subtitle}>WHO AM I</h5>
            <h3 className={styles.mainBlock__title}>About me 👋</h3>
          </header>
          <p className={styles.mainBlock__desc}>Seamlessly initiate standardized vortals and visionary catalysts for change. Interactively redefine synergistic supply chains through leading-edge best practices. Professionally architect standards compliant internal or "organic" sources whereas team building supply chains. Competently drive seamless benefits vis-a-vis optimal platforms.</p>
          <div className="w-100 d-flex flex-column flex-lg-row">
            <div className="mr-4 d-flex flex-column">
              <p className={styles.mainBlock__myInfo}><b>Name:</b>Pavlo Ivashchenko</p>
              <p className={styles.mainBlock__myInfo}><b>Age:</b>34</p>
            </div>
            <div className="d-flex flex-column">
              <p className={styles.mainBlock__myInfo}>
                <b>Email:</b>
                <span className={styles.mainBlock__myInfo_email}>pavlo.ivashchenko@gmail.com</span>
              </p>
              <p className={styles.mainBlock__myInfo}><b>Location:</b>Vienna, Austria</p>
            </div>
          </div>
          <div className={styles.mainBlock__controls}>
            <div className={styles.mainBlock__buttonWrap}>
              <ButtonPrimary title="Experience" link="/" filled={true}/>
            </div>
            <div className={styles.mainBlock__buttonWrap}>
              <ButtonSecondary title="Download CV" link="/" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default ScreenTwo;
