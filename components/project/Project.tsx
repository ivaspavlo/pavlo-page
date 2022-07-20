import React from 'react';
import { useTranslations } from 'next-intl';
import Icon from '@components/icon/Icon';
import styles from './Project.module.scss';


export interface IProjectConfig {
  id: string;
  title: string;
  desc: string;
  projectImg: string;
  stack: string[];
  sidebarRight?: boolean;
  codeLink?: string;
  liveLink?: string;
}

export interface IProject {
  config: IProjectConfig;
  index: number;
}

interface IBgStyles {
  aside: string;
  content: string;
}

function Project(props: IProject) {
  const t = useTranslations('portfolio');
  const config = props.config;

  const bgStyles: IBgStyles = getBgStyles(props.index);

  function getBgStyles(index: number): IBgStyles {
    if (index % 3 === 0) {
      return { aside: 'img/sidebar-3-bg.png', content: '#FBFFD0' };
    } else if (index % 2 === 0) {
      return { aside: 'img/sidebar-2-bg.png', content: '#8CB6FF' };
    } else {
      return { aside: 'img/sidebar-1-bg.png', content: '#A8AAFF' };
    }
  }

  return (
    <div className={styles.projectContainer}>

      <div style={{ 'backgroundColor': bgStyles.content }} className={`${styles.project} ${config.sidebarRight ? styles.project_sidebarRight : ''}`}>

        <aside style={{ 'backgroundImage': `url(${bgStyles.aside})` }} className={styles.projectSidebar}>
          <ul className={styles.projectSidebar__stack}>
            {config.stack.map(item =>
              <li className={styles.projectSidebar__stackItem}>{item}</li>
            )}
          </ul>
          {config.liveLink ?
            <a href={config.liveLink} target='_blank' className={`${styles.projectSidebar__button} ${styles.project__button_live}`}>
              <Icon name='github' />
              <span className='ml-2'>{t('live-project')}</span>
            </a>
          : ''}
        </aside>
        
        <div className='d-flex flex-column flex-md-row'>

          <div className={styles.project__content}>
            <div className='d-flex flex-column flex-grow-1 justify-content-center'>
              <h5 className={styles.project__title}>{t(config.title)}</h5>
              <p className={styles.project__desc}>{t(config.desc)}</p>
            </div>
              {config.codeLink ?
                <div className='w-100 d-flex'>
                  <a href={config.codeLink} target='_blank' className={`${styles.project__button} ${styles.project__button_code}`}>
                    <Icon name='github' />
                    <span className='ml-2'>{t('code')}</span>
                  </a>
                </div>
              : ''}
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
