import React, { useEffect, useState } from "react";
import styles from "./Burger.module.scss";


export interface IBurger {
  burgerToggle: (value: boolean) => void;
  currentState?: boolean
}

function Burger(props: IBurger) {
  const [burgerState, setBurgerState] = useState(false);
  useEffect(() => {
    if (props.currentState !== undefined && props.currentState !== burgerState) {
      setBurgerState(props.currentState);
    }
  }, [props.currentState]);

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
