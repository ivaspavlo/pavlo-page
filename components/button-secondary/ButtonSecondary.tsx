import React from 'react';
import styles from '@components/button-secondary/ButtonSecondary.module.scss';


export interface IButtonSecondary {
  title: string;
  link: string;
  filled?: boolean;
  fullWidth?: boolean;
  noBorder?: boolean;
}

function ButtonSecondary(props: IButtonSecondary) {
  return (
    <button className={`
      ${styles.buttonSecondary}
      ${props.fullWidth ? styles.fullWidth : ''}
      ${props.filled ? styles.filled : ''}
      ${props.noBorder ? styles.noBorder : ''}
    `}>
      <a href={props.link} download>{props.title}</a>
    </button>
  );
}

export default ButtonSecondary;
