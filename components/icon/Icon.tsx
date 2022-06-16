import React from "react";
import Image from 'next/image';
import styles from "@components/icon/Icon.module.scss";

export interface IIcon {
  name: string;
  hoverName?: string;
  isHovered?: boolean;
  width?: number;
  height?: number;
}

function Icon(props: IIcon) {
  const iconName = props.isHovered && props.hoverName ?
    `/icons/${props.hoverName}.svg` :
    `/icons/${props.name}.svg`;

  return (
    <figure className={styles.icon}>
      <Image src={iconName} width={props.width || 16} height={props.height || 16} alt={`Icon ${iconName}`}/>
    </figure>
  );
}

export default Icon;
