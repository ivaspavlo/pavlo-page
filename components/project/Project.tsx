import React from 'react';
import { useTranslations } from 'next-intl';
import Icon from '@components/icon/Icon';
import styles from './Project.module.scss';


export interface IProject {
  id: string;
  title: string;
  desc: string;
  codeLink: string;
  bgColor: string;
  projectImg: string;
  sidebarBg: string;
  stack: string[];
  sidebarRight?: boolean;
  liveLink?: string;
}

function Project(props: { config: IProject }) {
  const t = useTranslations('portfolio');
  const config = props.config;

  return (
    <div className={styles.projectContainer}>

      <div style={{ 'backgroundColor': config.bgColor }} className={`${styles.project} ${config.sidebarRight ? styles.project_sidebarRight : ''}`}>

        <aside style={{ 'backgroundImage': `url(${config.sidebarBg})` }} className={styles.projectSidebar}>
          <ul className={styles.projectSidebar__stack}>
            {config.stack.map(item =>
              <li className={styles.projectSidebar__stackItem}>{item}</li>
            )}
          </ul>
          <button className={`${styles.projectSidebar__button} ${styles.project__button_live}`}>
            <Icon name='github' />
            <span className='ml-2'>{t('live-project')}</span>
          </button>
        </aside>
        
        <div className='d-flex flex-column flex-md-row'>

          <div className={styles.project__content}>
            <div className='d-flex flex-column flex-grow-1 justify-content-center'>
              <h5 className={styles.project__title}>{t(config.title)}</h5>
              <p className={styles.project__desc}>{t(config.desc)}</p>
            </div>
            <div className='w-100 d-flex'>
              <button className={`${styles.project__button} ${styles.project__button_code}`}>
                <Icon name='github' />
                <span className='ml-2'>{t('code')}</span>
              </button>
            </div>
          </div>

          <div className={styles.project__imageContainer}>
            <div style={{ 'backgroundImage': `url(${config.projectImg})` }} className={styles.project__image} />
          </div>

        </div>

      </div>

    </div>
  );
}

export default Project;
