import React from 'react';
import styles from './ScreenFour.module.scss';


function ScreenFour() {
  return (
    <section id='sectionFourId' className={styles.screenFour}>
      <div id='list' className={styles.list}>
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
