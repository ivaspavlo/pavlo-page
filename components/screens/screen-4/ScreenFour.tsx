import { CONSTANTS } from '@root/constants';
import React, { useEffect, useRef, useState } from 'react';
import styles from './ScreenFour.module.scss';


function ScreenFour() {
  const listEl: any = useRef();

  let previousScreen = 0;
  let currentScreen = 0;
  let isInTransition = false;

  const transitionEndHandler = () => {
    isInTransition = false;
  };

  useEffect(() => {
    const el: any = listEl.current;
    if (el) {
      const onWheel = (e: any) => {
        console.log('test');
        if (isInTransition) {
          e.preventDefault();
          return;
        }
        if (currentScreen == -2 && e.deltaY > 0) {
          return;
        }
        if (currentScreen == 0 && e.deltaY < 0) {
          return;
        }
        if (e.deltaY === 0) {
          return;
        };
        e.preventDefault();
        isInTransition = true;
        const nextScreen = e.deltaY > 0 ? currentScreen - 1 : currentScreen + 1;
        currentScreen = nextScreen;
        el.style.transform = `translateX(${nextScreen}00vw)`;
      };
      el.addEventListener('wheel', onWheel);
      return () => el.removeEventListener('wheel', onWheel);
    }
  }, []);

  return (
    <section id={CONSTANTS.sectionIds.sectionFour} className={styles.screenFour}>
      <div onTransitionEnd={transitionEndHandler} ref={listEl} className={styles.list}>
        <div style={{'backgroundColor': 'red'}} className={styles.item}>
          <div style={{'color': 'white'}}>test 1</div>
        </div>
        <div style={{'backgroundColor': 'green'}} className={styles.item}>
          <div style={{'color': 'white'}}>test 1</div>
        </div>
        <div style={{'backgroundColor': 'blue'}} className={styles.item}>
          <div style={{'color': 'white'}}>test 1</div>
        </div>
      </div>
    </section>
  );
}

export default ScreenFour;
