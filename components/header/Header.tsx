import React, { useState, useEffect, useRef, useContext, memo } from 'react';
import { useTranslations } from 'next-intl';
import { fromEvent } from 'rxjs';
import { distinctUntilChanged, map, tap, startWith } from 'rxjs/operators';

import { CONSTANTS } from '@root/constants';
import { CoreContext, ICoreContext, IMessage } from '@root/pages';
import { onClickAnchorHandler } from '@root/utils';
import Burger from '@components/burger/Burger';
import LanguageBar from '@components/language-bar/LanguageBar';
import ButtonPrimary from '@components/button-primary/ButtonPrimary';

import styles from '@components/header/Header.module.scss';


const navLinks = [
  { uiName: 'about', scrollToId: CONSTANTS.sectionIds.sectionTwo },
  { uiName: 'services', scrollToId: CONSTANTS.sectionIds.sectionThree },
  { uiName: 'resume', scrollToId: CONSTANTS.sectionIds.experience },
  { uiName: 'portfolio', scrollToId: CONSTANTS.sectionIds.portfolio }
];

function Header() {
  const t = useTranslations('nav-menu');
  const { message } = useContext<ICoreContext>(CoreContext);
  const [burgerExpandedState, setBurgerExpandedState] = useState(false);
  const [isShrinked, setIsShrinked] = useState(false);
  const [isBurgerOpen, setBurgerState] = useState(false);
  const [headerWidth, setHeaderWidth] = useState(0);
  const menuRef = useRef(null);

  useEffect(() => {
    const scrollOrigin = document.getElementById(CONSTANTS.sectionIds.scrollOrigin) as HTMLDivElement;
    shrinkOnScroll(scrollOrigin);
    changeWidthOnResize(scrollOrigin);
  }, []);

  useEffect(() => {
    if (message.current.value) {
      showMessagePanel(message.current);
    }
  }, [message.current]);

  function showMessagePanel(value: IMessage): void {
    message.setCurrent(value);
    if (value.type !== 'supportUkraine') {
      setTimeout(() => {
        hideMessagePanel();
      }, 3000);
    }
  }

  function hideMessagePanel(): void {
    message.setCurrent({ value: '', type: 'hidden' });
  }

  function shrinkOnScroll(scrollOrigin: HTMLDivElement): void {
    if (!scrollOrigin) {
      return;
    }
    fromEvent<MouseEvent>(scrollOrigin, 'scroll').pipe(
      map((event: any) => event.target.scrollTop > 0),
      startWith(scrollOrigin.scrollTop),
      distinctUntilChanged(),
      tap((event: any) => setIsShrinked(event))
    ).subscribe();
  }

  function changeWidthOnResize(scrollOrigin: HTMLDivElement): void {
    // @ts-ignore
    const resizeObserver = new ResizeObserver((entry: ResizeObserverEntry[]) => {
      setHeaderWidth(entry[0].target.clientWidth);
    });
    resizeObserver.observe(scrollOrigin);
  }

  function burgerToggleHandler(): void {
    setBurgerState(true);
    setBurgerExpandedState(!burgerExpandedState);
  }

  function mobileLinkClickHandler(scrollToId: string): void {
    burgerToggleHandler();
    onClickAnchorHandler(scrollToId);
    setBurgerState(false);
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
            <Burger currentState={isBurgerOpen} burgerToggle={burgerToggleHandler} />
          </div>
        </div>

        <div ref={menuRef} className={`${styles.navMobile} ${burgerExpandedState ? styles.navMobile_expanded : ''}`}>
          <div className={styles.navMobile__container}>
            <ul className={styles.navMobile__list}>
              {navLinks.map(link => <li key={link.uiName} className={styles.navMobile__item}>
                <a onClick={() => mobileLinkClickHandler(link.scrollToId)} className={styles.navMobile__link}>{t(link.uiName)}</a>
              </li>)}
            </ul>
            <div className={styles.header__btnMobileWrap}>
              <ButtonPrimary onClick={() => mobileLinkClickHandler(CONSTANTS.sectionIds.coreFooter)} title={t('contact-btn')} iconName='link-arrow-green' iconNameHover='link-arrow-black' />
            </div>
          </div>
        </div>

        <div className={`${styles.alert} ${styles[message.current.type]}`}>
            <span>{t(message.current.value)}</span>
            {
              message.current.type === 'supportUkraine' ?
                <span className={styles.alert__supportUkraine}>
                  <a href="https://www.comebackalive.in.ua/" target='_blank'>{t('support-now')}</a>
                </span> :
                <i onClick={hideMessagePanel} className={styles.alert__close}></i>
            }
        </div>

      </div>

    </div>
  );
}

export default memo(Header);
