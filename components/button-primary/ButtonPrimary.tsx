import React, { useState } from 'react';
import Link from 'next/link';

import styles from '@components/button-primary/ButtonPrimary.module.scss';
import Icon from '../icon/Icon';

export interface IButtonPrimary {
  onClick?: () => any;
  title: string;
  link: string;
  iconName?: string;
  iconNameHover?: string;
  filled?: boolean;
  invalid?: boolean;
  iconRight?: boolean;
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
    debugger;
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
    <Link href={props.link}>
      <div
        onClick={onClickHandler}
        onMouseEnter={() => setHoverState(true)}
        onMouseLeave={() => setHoverState(false)}
        className={`
          ${styles.buttonPrimary}
          ${props.filled ? styles.filled : ''}
          ${startAnimate ? styles.invalid : ''}
        `}>
          {!props.iconRight ?? icon}
          <span className={styles.buttonPrimary__content}>{props.title}</span>
          {props.iconRight ?? icon}
      </div>
    </Link>
  );
}

export default ButtonPrimary; // TODO: add animation to the icon on hover.
