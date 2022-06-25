import { Observable } from "rxjs";


export type Validator = {[key:string]: (value: any) => boolean};
export type AsyncValidator = {[key:string]: (value: any) => Observable<boolean>};

export const Validators = {
  minChar: (charQty: number) => ({ minChar: (value: string) => value.length < charQty }),
  email: { email: (value: string) => !(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(value)))}
};
