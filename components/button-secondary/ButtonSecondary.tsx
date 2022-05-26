import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "@components/button-secondary/ButtonSecondary.module.scss";


export interface IButtonSecondary {
  title: string;
  link: string;
  filled?: boolean;
  fullWidth?: boolean;
  noBorder?: boolean;
}

function ButtonSecondary(props: IButtonSecondary) {
  const [state, setState] = useState(false);

  useEffect(() => {
    return () => {}
  }, []);

  return (
    <button className={`
      ${styles.buttonSecondary}
      ${props.fullWidth ? styles.fullWidth : ''}
      ${props.filled ? styles.filled : ''}
      ${props.noBorder ? styles.noBorder : ''}
    `}>
      <Link href={props.link}>{props.title}</Link>
    </button>
  );
}

export default ButtonSecondary;
