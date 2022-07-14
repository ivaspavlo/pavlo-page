import React, { forwardRef, MutableRefObject, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { first, map, Observable, zip } from 'rxjs';
import { AsyncValidator, Validator } from '@root/validators';
import Icon from '@components/icon/Icon';
import styles from './Input.module.scss';

export interface IInputEvent {
  controlName: string;
  value: string;
  isValid: boolean;
}

export interface IInput {
  controlName: string;
  value?: string | number;
  placeholder?: string;
  type?: string;
  label?: string;
  validators?: Validator[];
  asyncValidators?: AsyncValidator[];
  iconName?: string;
  errorsMap?: {[key:string]: string};
  onInput?: (res: IInputEvent) => any;
}

const Input = forwardRef((props: IInput, ref) => {
  const [errors, setErrors] = useState<string[]>([]);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const inputEl = useRef() as MutableRefObject<any>;
  useEffect(() => {
    onInputHandler();
  }, []);

  useImperativeHandle(ref, () => ({
    markAsDirty: () => {
      setIsDirty(true);
      onInputHandler();
    },
    value: () => inputEl.current.value,
    isValid: () => !!errors.length,
    resetValue: () => {
      inputEl.current.value = '';
      setIsDirty(false);
      onInputHandler();
    }
  }));

  const validators: Validator[] = props.validators || [];
  const asyncValidators: AsyncValidator[] = props.asyncValidators || [];
  
  const type = props.type || 'text';
  const errorsMap = props.errorsMap || {};

  function onInputHandler(): void {
    const value = inputEl.current?.value || '';
    const errors = runValidation(value);
    setErrors(errors);
    if (errors.length) {
      props.onInput && props.onInput({ controlName: props.controlName, value, isValid: false });
      return;
    }
    if (!errors.length && !asyncValidators.length) {
      props.onInput && props.onInput({ controlName: props.controlName, value, isValid: true });
    }
    runAsyncValidation(value).subscribe(
      (errors: string[]) => {
        setErrors(errors);
        props.onInput && props.onInput({ controlName: props.controlName, value, isValid: !!errors.length });
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
    <div className={`
      ${styles.input}
      ${errors.length && isDirty ? styles.invalid : ''}
    `}>

      {
        props.type === 'textarea' ?
          <textarea ref={inputEl} value={props.value} onInput={onInputHandler} placeholder={props.placeholder} name={props.controlName} /> :
          <input ref={inputEl} value={props.value} onInput={onInputHandler} placeholder={props.placeholder} name={props.controlName} type={type} />
      }

      <label htmlFor={props.controlName}>{props.label}</label>

      {errors.length && isDirty ? <p className={styles.error}>{errors[0]}</p> : ''}

      {props.iconName ? <Icon name={props.iconName} /> : ''}

    </div>
  );
});

export default Input;
