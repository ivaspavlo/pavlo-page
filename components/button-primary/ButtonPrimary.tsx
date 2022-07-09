import React, { useState } from 'react';

import styles from '@components/button-primary/ButtonPrimary.module.scss';
import Icon from '../icon/Icon';

export interface IButtonPrimary {
  onClick?: () => any;
  title: string;
  link?: string;
  iconName?: string;
  iconNameHover?: string;
  filled?: boolean;
  invalid?: boolean;
  iconRight?: boolean;
  disabled?: boolean;
}

function ButtonPrimary(props: IButtonPrimary) {
  const [isHovered, setHoverState] = useState(false);
  const [startAnimate, setStartAnimate] = useState(false);

  const animate = (): void => {
    setStartAnimate(true);
    setTimeout(() => {
      setStartAnimate(false);
    }, 1000);
  };

  const onClickHandler = (): void => {
    if (props.disabled) {
      return;
    }
    if (props.invalid) {
      animate();
    }
    props.onClick && props.onClick();
  }

  const icon = props.iconName ?
    <Icon
      name={`${props.iconName}`}
      hoverName={`${props.iconNameHover}`}
      isHovered={isHovered}
    /> : '';

  return (
    <div
      onClick={onClickHandler}
      onMouseEnter={() => setHoverState(true)}
      onMouseLeave={() => setHoverState(false)}
      className={`
        ${styles.buttonPrimary}
        ${startAnimate ? styles.invalid : ''}
        ${props.filled ? styles.filled : ''}
        ${props.disabled ? styles.disabled : ''}
      `}>
        {!props.iconRight ?? icon}
        <span className={styles.buttonPrimary__content}>{props.title}</span>
        {props.iconRight ?? icon}
    </div>
  );
}

// TODO: add animation to the icon on hover.

export default ButtonPrimary; 
