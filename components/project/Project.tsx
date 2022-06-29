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

  return (
    <div className={`${styles.projectContainer} ${styles.projectContainer_sidebarLeft ? config.sidebarLeft : ''}`}>

      <aside style={{ 'backgroundImage': `url(${config.sidebarBg})` }} className={`${styles.projectSidebar} ${config.sidebarLeft ? styles.projectSidebar_sidebarLeft : ''}`}>
        <h5 className={styles.projectSidebar__title}>{config.sidebarTitle}</h5>
        <button className={styles.projectSidebar__button}>
          <Icon name='github' />
          <span className='ml-2'>{t('code')}</span>
        </button>
      </aside>

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

        <div className={styles.project__imageContainer}>
          <div style={{ 'backgroundImage': `url(${config.projectImg})` }} className={styles.project__image} />
        </div>

      </div>

    </div>
  );
}

export default Project;
