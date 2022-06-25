import React, { MutableRefObject, useRef, useState } from 'react';
import { InView } from 'react-intersection-observer';
import { useTranslations } from 'next-intl';

import { CONSTANTS } from '@root/constants';
import { Validators } from '@root/validators';

import Icon from '@components/icon/Icon';
import Input, { IInputEvent } from '@components/input/Input';
import ButtonPrimary from '@components/button-primary/ButtonPrimary';

import styles from './Footer.module.scss';


const socialLinks = [
  { iconName: 'facebook', link: '/' },
  { iconName: 'instagram', link: '/' },
  { iconName: 'linkedin-white', link: '/' },
];

const contacts = [
  { iconName: 'email', uiName: 'ivashchenko.pavel@gmail.com' },
  { iconName: 'linkedin-black', uiName: 'https://www.linkedin.com/in/pavloiv/' },
  { iconName: 'telegram', uiName: '@pavlo-ivashchenko' }
];

const anchorLinks = [
  { uiName: 'anchor-about', scrollToId: CONSTANTS.sectionIds.sectionTwo },
  { uiName: 'anchor-resume', scrollToId: CONSTANTS.sectionIds.sectionThree },
  { uiName: 'anchor-portfolio', scrollToId: CONSTANTS.sectionIds.sectionFour }
];

const initFormState = {
  name: {},
  email: {},
  message: {}
}

interface IFormState {
  [key:string]: { value?: any; isValid?: boolean; }
}

function Footer() {
  const t = useTranslations('footer');
  const tErrors = useTranslations('errors');

  const [formState, setFormState] = useState<IFormState>(initFormState);
  const [formValidity, setFormValidity] = useState<boolean>(false);

  const nameInput = useRef() as MutableRefObject<any>;
  const emailInput = useRef() as MutableRefObject<any>;
  const messageInput = useRef() as MutableRefObject<any>;

  const formInputs = [ nameInput, emailInput, messageInput ];

  const errorsMap = {
    email: tErrors('errorEmail'),
    minChar: tErrors('errorMinChar')
  };

  const onClickAnchorHandler = (scrollToId: string) => {
    document.getElementById(scrollToId)?.scrollIntoView();
  }

  const onFormSubmitHandler = () => {
    // TODO: back end logic required
    formInputs.forEach(fi => {
      if (!formValidity) {
        fi.current.markAsDirty();
      }
      fi.current.resetValue();
    });
  }

  const onInputHandler = (res: IInputEvent) => {
    setFormState({
      ...formState,
      [res.controlName]: { value: res.value, isValid: res.isValid }
    });
    const isFormValid = !Object.keys(formState).some(key => !formState[key].isValid);
    setFormValidity(isFormValid);
  }

  return (
    <InView threshold={0.25}>
      {({ref, inView}) => (
        <section ref={ref} className={styles.footer}>

          <div className={styles.footerContent}>

            <div className={`${styles.footerContent__column} ${styles.footerContent__column_first}`}>
              <h3 className={styles.footerContent__title}>
                <span>{t('contact')}</span>
                <br />
                <span>{t('me')}</span>
                <div className='d-inline-flex ml-2'>👋</div>
              </h3>
              <p className={styles.footerContent__desc}>{t('desc')}</p>
              <ul className='d-flex flex-column'>
                {contacts.map(item =>
                  <li key={item.uiName} className={styles.contactItem}>
                    <div className={styles.contactItem__icon}>
                      <Icon name={item.iconName}></Icon>
                    </div>
                    <p className={styles.contactItem__name}>{item.uiName}</p>
                  </li>
                )}
              </ul>
            </div>
            
            <div className={`${styles.footerContent__column} ${styles.footerContent__column_second}`}>
              <form className={styles.form}>

                <h4 className={styles.form__header}>{t('form-header')}</h4>

                <Input ref={nameInput} onInput={onInputHandler} controlName='name' label={t('form-name')} validators={[Validators.minChar(3)]} errorsMap={errorsMap} />
                <Input ref={emailInput} onInput={onInputHandler} controlName='email' label={t('form-email')} validators={[Validators.email]} errorsMap={errorsMap} />
                <Input ref={messageInput} onInput={onInputHandler} controlName='message' label={t('form-message')} type='textarea' validators={[Validators.minChar(3)]} errorsMap={errorsMap} />
                
                <div className={styles.form__button}>
                  <ButtonPrimary onClick={onFormSubmitHandler} invalid={!formValidity} title={t('form-button')} link='/' filled={true} />
                </div>

              </form>
            </div>

          </div>

          <div className={styles.bottomLine}>
            <div className={styles.bottomLine__content}>

              <h5 className={styles.bottomLine__title}>{t('bottom-line-title')}</h5>

              <div className='d-flex flex-column flex-md-row'>
                <ul className='mt-3 mt-md-0 d-flex justify-content-center align-items-center'>
                  {anchorLinks.map(item =>
                    <li key={item.uiName} className='mx-3'>
                      <a onClick={() => onClickAnchorHandler(item.scrollToId)} className={styles.bottomLine__anchorLink}>{t(item.uiName)}</a>
                    </li>
                  )}
                </ul>
                <ul className='mt-3 mt-md-0 d-flex justify-content-center align-items-center'>
                  {socialLinks.map((item, index) =>
                    <li key={item.iconName} className={`${index ? 'ml-2': ''}`}>
                      <a className={styles.bottomLine__socialLink} href={item.link} target='_blank'>
                        <Icon name={item.iconName}></Icon>
                      </a>
                    </li>
                  )}
                </ul>
              </div>

            </div>
          </div>

        </section>
      )}
    </InView>
  );
}

export default Footer;
