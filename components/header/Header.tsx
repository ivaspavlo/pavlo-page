import React, { useState, useEffect, useRef, RefObject, memo, useContext } from 'react';
import { useTranslations } from 'next-intl';
import { fromEvent, Subject } from 'rxjs';
import { distinctUntilChanged, map, takeUntil, tap } from 'rxjs/operators';

import { CONSTANTS } from '@root/constants';
import { CoreContext } from '@root/pages';
import Burger from '@components/burger/Burger';
import LanguageBar from '@components/language-bar/LanguageBar';
import ButtonPrimary from '@components/button-primary/ButtonPrimary';

import styles from '@components/header/Header.module.scss';


const navLinks = [
  { uiName: 'about', scrollToId: CONSTANTS.sectionIds.sectionTwo },
  { uiName: 'services', scrollToId: CONSTANTS.sectionIds.sectionThree },
  { uiName: 'resume', scrollToId: CONSTANTS.sectionIds.sectionFour },
  { uiName: 'portfolio', scrollToId: CONSTANTS.sectionIds.sectionFive }
];

function Header(props: { scrollOrigin: RefObject<HTMLDivElement>; }) {
  const t = useTranslations('nav-menu');
  const { message } = useContext(CoreContext);
  const [burgerExpandedState, setBurgerExpandedState] = useState(false);
  const [isShrinked, setIsShrinked] = useState(false);
  const menuRef = useRef(null);
  const destroy$: Subject<void> = new Subject();

  useEffect(() => {
    shrinkOnScroll();
    return () => {
      destroy$.next();
      destroy$.complete();
    }
  }, []);

  useEffect(() => {
    if (message.current) {
      toggleMessagePanel(message.current);
    }
  }, [message.current]);

  function toggleMessagePanel(value: string): void {
    message.setCurrent(value);
    setTimeout(() => {
      message.setCurrent('');
    }, 3000);
  }

  function shrinkOnScroll(): void {
    if (!props.scrollOrigin?.current) {
      return;
    }
    fromEvent<MouseEvent>(props.scrollOrigin.current, 'scroll').pipe(
      map((event: any) => event.target.scrollTop > 0),
      distinctUntilChanged(),
      takeUntil(destroy$),
      tap((event: any) => setIsShrinked(event))
    ).subscribe();
  }

  const burgerToggleHandler = (): void => {
    setBurgerExpandedState(!burgerExpandedState);
  }

  const onClickAnchorHandler = (scrollToId: string) => {
    document.getElementById(scrollToId)?.scrollIntoView();
  }

  return (
    <div className={`${styles.header} ${isShrinked ? styles.header_isShrinked : ''}`}>

      <div className={styles.header__container}>

        <a onClick={() => onClickAnchorHandler(CONSTANTS.sectionIds.sectionOne)} className={styles.header__logo}>
          <span>Pavlo</span>
          <span>Ivashchenko</span>
        </a>

        <ul className={`${styles.navDesktop} d-none d-md-flex`}>
          {navLinks.map(link => <li key={link.uiName} className={styles.navDesktop__item}>
            <a onClick={() => onClickAnchorHandler(link.scrollToId)} className={styles.navDesktop__link}>{t(link.uiName)}</a>
          </li>)}
        </ul>

        <div className='d-flex align-items-center'>
          <div className='mx-3 mx-md-2 d-flex align-center'>
            <LanguageBar />
          </div>
          <div className={styles.header__btnDesktopWrap}>
            <ButtonPrimary onClick={() => onClickAnchorHandler(CONSTANTS.sectionIds.coreFooter)} title={t('contact-btn')} link='/' iconName='link-arrow-green' iconNameHover='link-arrow-black' />
          </div>
          <div className='d-flex d-md-none'>
            <Burger menuRef={menuRef} burgerToggle={burgerToggleHandler} />
          </div>
        </div>

        <div ref={menuRef} className={`${styles.navMobile} ${burgerExpandedState ? styles.navMobile_expanded : ''}`}>
          <div className={styles.navMobile__container}>
            <ul className={styles.navMobile__list}>
              {navLinks.map(link => <li key={link.uiName} className={styles.navMobile__item}>
                <a className={styles.navMobile__link}>{t(link.uiName)}</a>
              </li>)}
            </ul>
            <div className={styles.header__btnMobileWrap}>
              <ButtonPrimary onClick={() => onClickAnchorHandler(CONSTANTS.sectionIds.coreFooter)} title={t('contact-btn')} iconName='link-arrow-green' iconNameHover='link-arrow-black' />
            </div>
          </div>
        </div>
        
        <div className={`${styles.alert} ${message.current ? styles.alert_visible : ''}`}>
          <p>{message.current}</p>
          <i className={styles.alert__close}></i>
        </div>
        
      </div>
      
    </div>
  );
}

export default memo(Header);
