import React, { useState, useEffect, useRef, RefObject, memo, useContext } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { fromEvent, Subject } from 'rxjs';
import { distinctUntilChanged, map, takeUntil, tap } from 'rxjs/operators';

import Burger from '@components/burger/Burger';
import LanguageBar from '@components/language-bar/LanguageBar';
import ButtonPrimary from '@components/button-primary/ButtonPrimary';
import { LayoutContext } from '@components/layout/Layout';

import styles from '@components/header/Header.module.scss';


const navLinks = [
  { uiName: 'about' },
  { uiName: 'services' },
  { uiName: 'resume' },
  { uiName: 'portfolio' }
];

function Header(props: { scrollOrigin: RefObject<HTMLDivElement>; }) {
  const t = useTranslations('Nav-menu');
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

  return (
    <div className={`${styles.header} ${isShrinked ? styles.header_isShrinked : ''}`}>

      <div className={styles.header__container}>

        <Link href="/">
          <p className={styles.header__logo}>
            <span>Pavlo</span>
            <span>Ivashchenko</span>
          </p>
        </Link>

        <ul className={`${styles.navDesktop} d-none d-md-flex`}>
          {navLinks.map(link => <li key={link.uiName} className={styles.navDesktop__item}>
            <a className={styles.navDesktop__link}>{t(link.uiName)}</a>
          </li>)}
        </ul>

        <div className="d-flex align-items-center">
          <div className="mx-3 mx-md-2 d-flex align-center">
            <LanguageBar />
          </div>
          <div className={styles.header__btnDesktopWrap}>
            <ButtonPrimary title={t("contact-btn")} link="/" iconName="link-arrow-green" iconNameHover="link-arrow-black" />
          </div>
          <div className="d-flex d-md-none">
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
              <ButtonPrimary title={t("contact-btn")} link="/" iconName="link-arrow-green" iconNameHover="link-arrow-black" />
            </div>
          </div>
        </div>

      </div>
      
    </div>
  );
}

export default memo(Header);
