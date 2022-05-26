import React, { RefObject, useState } from "react";
import styles from "./Burger.module.scss";


export interface IBurger {
  burgerToggle: (value: boolean) => void;
  menuRef: RefObject<any>
}

function Burger(props: IBurger) {
  const [burgerState, setBurgerState] = useState(false);

  function toggleBurger(): void {
    props.burgerToggle(!burgerState);
    setBurgerState(!burgerState);
  }

  return (
    <button onClick={toggleBurger} className={`${styles.burger} ${burgerState ? styles.isOn : ''}`}>
      <span className={styles.burger__stripe}></span>
    </button>
  );
}
    
export default Burger;
