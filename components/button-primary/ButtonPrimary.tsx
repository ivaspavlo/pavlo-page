import React, { useState, MouseEvent, CSSProperties, Fragment } from 'react';
import { PulseLoader } from 'react-spinners';

import styles from '@components/button-primary/ButtonPrimary.module.scss';
import Icon from '../icon/Icon';

export interface IButtonPrimary {
  onClick?: (event: MouseEvent<any>) => any;
  title: string;
  link?: string;
  iconName?: string;
  iconNameHover?: string;
  filled?: boolean;
  invalid?: boolean;
  iconRight?: boolean;
  disabled?: boolean;
  loading?: boolean;
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

  const override: CSSProperties = {
    display: 'flex',
    zIndex: 1
  };

  const onClickHandler = (event: MouseEvent<any>): void => {
    if (props.disabled) {
      return;
    }
    if (props.invalid) {
      animate();
    }
    props.onClick && props.onClick(event);
  }

  const icon = props.iconName ?
    <Icon
      name={`${props.iconName}`}
      hoverName={`${props.iconNameHover}`}
      isHovered={isHovered}
    /> : '';

  return (
    <div
      onClick={(event: MouseEvent<any>) => onClickHandler(event)}
      onMouseEnter={() => setHoverState(true)}
      onMouseLeave={() => setHoverState(false)}
      className={`
        ${styles.buttonPrimary}
        ${startAnimate ? styles.invalid : ''}
        ${props.filled ? styles.filled : ''}
        ${props.disabled ? styles.disabled : ''}
        ${props.loading ? styles.loading : ''}
      `}>
        {
          props.loading ?
            <PulseLoader color={props.filled ? '#000' : '#fff'} loading={props.loading} cssOverride={override} size={10} /> :
            <Fragment>
              {!props.iconRight ?? icon}
              <span className={styles.buttonPrimary__content}>{props.title}</span>
              {props.iconRight ?? icon}
            </Fragment>
        }
    </div>
  );
}

// TODO: add animation to the icon on hover.

export default ButtonPrimary; 
