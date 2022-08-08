import React, { MutableRefObject, useRef, useState, MouseEvent, useContext } from 'react';
import { InView } from 'react-intersection-observer';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

import { CONSTANTS } from '@root/constants';
import { Validators } from '@root/utils/validators';
import { onClickAnchorHandler } from '@root/utils';
import { CoreContext } from '@root/pages';

import Icon from '@components/icon/Icon';
import Input from '@components/input/Input';
import ButtonPrimary from '@components/button-primary/ButtonPrimary';

import styles from './Footer.module.scss';


const socialLinks = [
  { iconName: 'facebook', link: 'https://www.facebook.com/pavloiva/' },
  { iconName: 'instagram', link: 'https://www.instagram.com/invites/contact/?i=1odcb0ml4a46h&utm_content=n4glbz8' },
  { iconName: 'skype', link: 'ttps://join.skype.com/invite/phipk837xLb4' }
];

const contacts = [
  { iconName: 'email', uiName: 'pavloiva@gmail.com' },
  { iconName: 'linkedin-black', uiName: 'https://www.linkedin.com/in/pavloiva/' },
  { iconName: 'telegram', uiName: '@pavloiva' }
];

const anchorLinks = [
  { uiName: 'anchor-about', scrollToId: CONSTANTS.sectionIds.sectionTwo },
  { uiName: 'anchor-resume', scrollToId: CONSTANTS.sectionIds.sectionThree },
  { uiName: 'anchor-portfolio', scrollToId: CONSTANTS.sectionIds.experience }
];

function Footer() {
  const t = useTranslations('footer');
  const tErrors = useTranslations('errors');
  const { message } = useContext(CoreContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [contactCopied, setContactCopied] = useState<string>('');

  const animation_1 = {
    open: { translateY: 0, opacity: 1 },
    closed: { translateY: '-5%', opacity: 0 }
  };

  const animation_2 = {
    open: { translateX: 0, opacity: 1 },
    closed: { translateX: '-5%', opacity: 0 }
  }

  const animation_3 = {
    open: { scale: 1, opacity: 1 },
    closed: { scale: .7, opacity: 0 }
  }

  const form: {[key:string]: MutableRefObject<any>} = {
    name: useRef() as MutableRefObject<any>,
    email: useRef() as MutableRefObject<any>,
    message: useRef() as MutableRefObject<any>
  };

  const errorsMap = {
    email: tErrors('errorEmail'),
    minChar: tErrors('errorMinChar')
  };

  const onFormSubmitHandler = (event: MouseEvent<any>): void => {
    event.preventDefault();

    if (isLoading) {
      return;
    }

    if (!isFormValid) {
      Object.keys(form).forEach(key => {
        const inputElem = form[key].current;
        inputElem.markAsDirty();
      });
      return;
    }

    setIsLoading(true);

    const formValue = Object.keys(form).reduce((acc, key) => {
      return { ...acc, [key]: form[key].current.value() };
    }, {});

    fetch(`${CONSTANTS.api.base}/${CONSTANTS.api.contact}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formValue)
    }).then((res: { status: number; [key:string]: any; }) => {
      return res.json();
    }).then(({ success }: { success: true; }) => {
      if (success) {
        Object.keys(form).forEach((key: string) => {
          form[key].current.resetValue();
        });
        message.setCurrent({value: CONSTANTS.coreMessages.emailSentSuccess, type: 'success'});
      } else {
        message.setCurrent({value: CONSTANTS.coreMessages.emailSentFail, type: 'error'});
      }
      setIsLoading(false);
    });
  }

  const checkFormValidity = (form: {[key:string]: MutableRefObject<any>}): boolean => {
    const hasErrors = Object.keys(form).find((key: string) => {
      return !form[key].current.isValid();
    });
    return !hasErrors;
  }

  const onInputHandler = () => {
    setIsFormValid(
      checkFormValidity(form)
    );
  }

  const onCopyClipboard = (contact: string) => {
    setContactCopied(contact);
    navigator.clipboard.writeText(contact);
    setTimeout(() => {
      setContactCopied('');
    }, 600);
  }

  return (
    <InView threshold={.25}>
      {({ref, inView}) => (
        <footer id={CONSTANTS.sectionIds.coreFooter} ref={ref} className={styles.footer}>

          <div className={styles.footerContent}>

            <div className={`${styles.footerContent__column} ${styles.footerContent__column_first}`}>
              <h3 className={styles.footerContent__title}>
                <span>{t('contact')}</span>
                <br />
                <span>{t('me')}</span>
                <motion.div
                  initial={false}
                  animate={inView ? 'open' : 'closed'}
                  variants={animation_3}
                  transition={{ duration: .8, ease: 'easeInOut', delay: 1 }}
                  className='d-inline-flex ml-2'
                >🖖</motion.div>
              </h3>
              <p className={styles.footerContent__desc}>{t('desc')}</p>
              <ul className='d-flex flex-column'>
                {contacts.map((item: { iconName: string; uiName: string; }, index: number) =>
                  <motion.li
                    initial={false}
                    animate={inView ? 'open' : 'closed'}
                    variants={animation_2}
                    transition={{ duration: .8, ease: 'easeOut', delay: index * 0.3 }}
                    onClick={() => onCopyClipboard(item.uiName)} key={item.uiName} className={styles.contactItem}>
                      <div className={styles.contactItem__icon}>
                        <Icon name={item.iconName}></Icon>
                      </div>
                      <p className={styles.contactItem__name}>{item.uiName}</p>
                      <a className={styles.contactItem__copy}>
                        <Icon name={contactCopied === item.uiName ? 'check' : 'copy'} />
                      </a>
                  </motion.li>
                )}
              </ul>
            </div>
            
            <motion.div
              initial={false}
              animate={inView ? 'open' : 'closed'}
              variants={animation_1}
              transition={{ duration: .8, ease: 'easeOut'}}
              className={`${styles.footerContent__column} ${styles.footerContent__column_second}`}>
                <form className={styles.form}>

                  <h4 className={styles.form__header}>{t('form-header')}</h4>

                  <Input ref={form.name} controlName='name' onInput={onInputHandler} label={t('form-name')} validators={[Validators.minChar(3)]} errorsMap={errorsMap} />
                  <Input ref={form.email} controlName='email' onInput={onInputHandler} label={t('form-email')} validators={[Validators.email]} errorsMap={errorsMap} />
                  <Input ref={form.message} controlName='message' onInput={onInputHandler} label={t('form-message')} type='textarea' validators={[Validators.minChar(3)]} errorsMap={errorsMap} />
                  
                  <div className={styles.form__button}>
                    <ButtonPrimary onClick={(event: MouseEvent<any>) => onFormSubmitHandler(event)} invalid={!isFormValid} title={t('form-button')} filled={true} loading={isLoading} />
                  </div>

                </form>
            </motion.div>

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
                      <a href={item.link} className={styles.bottomLine__socialLink}>
                        <Icon name={item.iconName}></Icon>
                      </a>
                    </li>
                  )}
                </ul>
              </div>

            </div>
          </div>

        </footer>
      )}
    </InView>
  );
}

export default Footer;
