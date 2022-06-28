import React from 'react';
import { useTranslations } from 'next-intl';
import Icon from '@components/icon/Icon';
import styles from './Project.module.scss';


export interface IProject {
  title: string;
  desc: string;
  codeLink: string;
  bgColor: string;
  projectImg: string;
  sidebarBg: string;
  sidebarTitle: string;
  sidebarLeft?: boolean;
  liveLink?: string;
}

function Project(props: { config: IProject }) {
  const t = useTranslations('portfolio');
  const config = props.config;

  const sidebar = (
    <div style={{ 'backgroundImage': config.sidebarBg }} className={styles.sidebar}>
      <h5 className={styles.sidebar__title}>{config.sidebarTitle}</h5>
      <button className={styles.sidebar__button}>
        <Icon name='github' />
        <span>{t('code')}</span>
      </button>
    </div>
  );

  return (
    <div className='w-100 d-flex flex-column flex-md-row'>

      {!config.sidebarLeft ? sidebar : ''}

      <div style={{ 'backgroundColor': config.bgColor }} className={styles.project}>

        <div className={styles.project__content}>
          <h5 className={styles.project__title}>{config.title}</h5>
          <p className={styles.project__desc}>{config.desc}</p>
          <div className='w-100 d-flex'>
            <button className={`${styles.project__button} ${styles.project__button_code}`}>
              <Icon name='github' />
              <span className='ml-2'>{t('code')}</span>
            </button>
            <button className={`${styles.project__button} ${styles.project__button_live}`}>{t('live-project')}</button>
          </div>
        </div>

        <img src={config.projectImg} alt={config.title + ' Image'} className={styles.project__image} />

      </div>

      {config.sidebarLeft ? sidebar : ''}

    </div>
  );
}

export default Project;
