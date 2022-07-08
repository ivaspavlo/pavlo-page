import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { CONSTANTS } from '@constants/index';
import classes from '@components/language-bar/LanguageBar.module.scss';


function LanguageBar() {
  const languages = CONSTANTS.lang;

  const { locale } = useRouter();
  const [ currentLang, setCurrentLang ] = useState<string>('');
  const [ meunItems, setMenuItems ] = useState<string[]>([]);

  useEffect(() => {
    const currentLang = initCurrentLang();
    selectHandler(currentLang);
  }, []);

  const selectHandler = (lang: string): void => {
    setCurrentLang(lang);
    filterMenuItems(lang);
  }

  const filterMenuItems = (item: string): void => {
    const filteredItems: string[] = languages.filter(l => l !== item);
    setMenuItems(filteredItems);
  }

  const initCurrentLang = (): string => {
    return languages.find(l => l === locale) || languages[0];
  }

  return (
    <div className={classes.menu}>
      <a className={classes.menu__current}>{currentLang}</a>
      <ul className={classes.menu__list}>
        {meunItems.map(item => (
          <li onClick={() => selectHandler(item)} className={classes.menu__item} key={item}>
            <Link href={item} locale={item}>{item}</Link>
          </li>
        ))}
      </ul>
    </div>
  );

}

export default LanguageBar;
