import React, { useState } from 'react';
import Icon from '@components/icon/Icon';
import styles from './Input.module.scss';
// import { Observable } from 'rxjs';


type Validator = {[key:string]: (value: any) => boolean};
type AsyncValidator = {[key:string]: (value: any) => any};

export interface IInput {
  controlName: string;
  placeholder?: string;
  type?: string;
  label?: string;
  validators?: Validator[];
  asyncValidators?: AsyncValidator[],
  iconName?: string;
  errorsMap?: {[key:string]: string}
}

function Input(props: IInput) {
  const [errors, setErrors] = useState<string[]>([]);

  const validators: Validator[] = props.validators || [ { testError: (value) => value !== 'test' } ];
  const type = props.type || 'text';
  const errorsMap = props.errorsMap || {};

  const onInputHandler = (event: any) => {
    setErrors(
      runValidation(event.target.value)
    );
  }

  function runValidation(value: any): string[] {
    if (!validators.length) {
      return [];
    }
    return validators.reduce((acc: string[], validator: Validator) => {
      const errorKey = Object.keys(validator)[0];
      const validatorFn = validator[errorKey];
      const error = validatorFn(value);
      return error ? [...acc, errorsMap[errorKey] || errorKey ] : acc;
    }, []);
  }

  return (
    <div className={styles.input}>

      {
        props.type === 'textarea' ?
          <textarea onInput={onInputHandler} placeholder={props.placeholder} name={props.controlName} /> :
          <input onInput={onInputHandler} placeholder={props.placeholder} name={props.controlName} type={type} />
      }

      <label htmlFor={props.controlName}>{props.label}</label>

      {errors ? errors.map(e => <p className={styles.error}>{'error'}</p>) : ''}

      {props.iconName ? <Icon name={props.iconName} /> : ''}

    </div>
  );
}

export default Input;
