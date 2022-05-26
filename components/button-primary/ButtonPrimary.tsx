import React, { useState, useEffect } from "react";
import Link from "next/link";

import styles from "@components/button-primary/ButtonPrimary.module.scss";
import Icon from "../icon/Icon";

export interface IButtonPrimary {
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
  const [isInvalid, setInvalidState] = useState(false);

  useEffect(() => {
    setInvalidState(props.invalid || false);
  }, []);

  const animate = (): void => {
    if (!isInvalid) {
      setInvalidState(true);
      setTimeout(() => {
        setInvalidState(false);
      }, 1000);
    }
  };

  const icon = props.iconName ?
    <Icon
      name={`${props.iconName}`}
      hoverName={`${props.iconNameHover}`}
      isHovered={isHovered}
    /> : "";

  return (
    <Link href={props.link}>
      <div
        onClick={() => animate()}
        onMouseEnter={() => { setHoverState(true); }}
        onMouseLeave={() => { setHoverState(false); }}
        className={`
          ${styles.buttonPrimary}
          ${props.filled ? styles.filled : ""}
          ${props.invalid ? styles.isInvalid : ""}
        `}>
          {!props.iconRight ?? icon}
          <span className={styles.buttonPrimary__content}>{props.title}</span>
          {props.iconRight ?? icon}
      </div>
    </Link>
  );
}

export default ButtonPrimary; // TODO: add animation to the icon on hover.
