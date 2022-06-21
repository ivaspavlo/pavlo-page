import React, { useState } from "react";
import Icon from "@components/icon/Icon";
import styles from "./Input.module.scss";


type Validator = (value: any) => null | {[key:string]: any};

export interface IInput {
  controlName: string;
  placeholder?: string;
  type?: string;
  label?: string;
  validators?: Validator[];
  iconName?: string;
}

function Input(props: IInput) {
  const [errors, setErrors] = useState([]);

  const inputValidators = props.validators || [];
  const inputType = props.type || 'text';

  return (
    <div className={styles.input}>

      {
        props.type === 'textarea' ?
          <textarea placeholder={props.placeholder} name={props.controlName} /> :
          <input placeholder={props.placeholder} name={props.controlName} type={inputType} />
      }

      <label htmlFor={props.controlName} >{props.label}</label>

      {errors ? errors.map(e => <p className={styles.error}>{'error'}</p>) : ''}

      {props.iconName ? <Icon name={props.iconName} /> : ''}

    </div>
  );
}

export default Input;
