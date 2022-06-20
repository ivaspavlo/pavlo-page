import React from "react";
import styles from "./Input.module.scss";


export interface IInput {
  placeholder: string;
  type: string;
  label: string;
  controlName: string;
}

function Input(props: IInput) {

  return (
    <div className={styles.input}>

      {
        props.type === 'textarea' ?
          <textarea placeholder={props.placeholder} name={props.controlName} className={styles.input__field} /> :
          <input type={props.type} placeholder={props.placeholder} name={props.controlName} className={styles.input__textArea} />
      }

      <label htmlFor={props.controlName} className={styles.input__label}>{props.label}</label>

      <p className={styles.input__error}>{}</p>

      {/* <input *ngIf="innerInputType !== 'textarea'" [attr.disabled]="control.disabled || null" class="input__field" [ngClass]="{'input__field--has-value': !!(control.valueChanges | async)}" [id]="controlName" name="input" [placeholder]="placeholder" [type]="innerInputType" [formControl]="innerControl" (focus)="onFocus()" (blur)="onBlur()"> */}
      {/* <textarea *ngIf="innerInputType === 'textarea'" class="input__text-area" [ngClass]="{'input__field--has-value': !!(control.valueChanges | async)}" [id]="controlName" name="textarea" [placeholder]="placeholder" rows="4" cols="50" [formControl]="innerControl" (focus)="onFocus()" (blur)="onBlur()"></textarea> */}
        
      {/* <label [for]="controlName" class="input__label">{{label}}</label> */}
      
      {/* <p class="input__error">{{control.errors | firstError:errorsMap}}</p> */}
      
      {/* <app-input-icon [type]="type" (togglePasswordVisibility)="onPasswordToggle($event)"></app-input-icon> */}

    </div>
  );
}

export default Input;
