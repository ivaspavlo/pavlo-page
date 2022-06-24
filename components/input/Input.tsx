import React, { useState } from 'react';
import { first, map, Observable, zip } from 'rxjs';
import Icon from '@components/icon/Icon';
import styles from './Input.module.scss';


type Validator = {[key:string]: (value: any) => boolean};
type AsyncValidator = {[key:string]: (value: any) => Observable<boolean>};

export interface IInputEvent {
  controlName: string;
  value: string;
  isValid: boolean;
}

export interface IInput {
  onInput: (res: IInputEvent) => any;
  onMarkDirty?: () => any;
  controlName: string;
  value?: string | number;
  placeholder?: string;
  type?: string;
  label?: string;
  validators?: Validator[];
  asyncValidators?: AsyncValidator[];
  iconName?: string;
  errorsMap?: {[key:string]: string};
}

function Input(props: IInput) {
  const [errors, setErrors] = useState<string[]>([]);

  const validators: Validator[] = props.validators || [];
  const asyncValidators: AsyncValidator[] = props.asyncValidators || [];
  
  const type = props.type || 'text';
  const errorsMap = props.errorsMap || {};

  const onInputHandler = (event: any) => {
    const value = event.target.value;
    const errors = runValidation(value);
    setErrors(errors);
    if (errors.length) {
      props.onInput({ controlName: props.controlName, value, isValid: false });
      return;
    }
    if (!errors.length && !asyncValidators.length) {
      props.onInput({ controlName: props.controlName, value, isValid: true });
    }
    runAsyncValidation(value).subscribe(
      (errors: string[]) => {
        setErrors(errors);
        props.onInput({ controlName: props.controlName, value, isValid: !!errors.length });
      }
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

  function runAsyncValidation(value: any): Observable<any> {
    const validatorObservables = asyncValidators.map((validator: AsyncValidator) => {
      const errorKey = Object.keys(validator)[0];
      return validator[errorKey](value).pipe(
        first(),
        map(res => res ? errorsMap[errorKey] || errorKey : null)
      );
    });
    return zip(...validatorObservables).pipe(
      map((errors: (string | null)[]) => errors.filter(item => item !== null))
    );
  }

  return (
    <div className={`${styles.input} ${errors.length ? styles.invalid : ''}`}>

      {
        props.type === 'textarea' ?
          <textarea value={props.value} onInput={onInputHandler} placeholder={props.placeholder} name={props.controlName} /> :
          <input value={props.value} onInput={onInputHandler} placeholder={props.placeholder} name={props.controlName} type={type} />
      }

      <label htmlFor={props.controlName}>{props.label}</label>

      {errors ? errors.map(error => <p className={styles.error}>{error}</p>) : ''}

      {props.iconName ? <Icon name={props.iconName} /> : ''}

    </div>
  );
}

export default Input;
