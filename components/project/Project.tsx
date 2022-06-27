import React from 'react';
import styles from './Project.module.scss';


export interface IProject {
  title: string;
  desc: string;
  codeLink: string;
  projectImg: string;
  projectType: string;
  sidebarBg: string;
  mainBgColor: string;
  liveLink?: string;
  sidebarLeft?: boolean;
}

function Project(props: IProject) {



  return (
    <div className="d-flex flex-column flex-md-row">

    </div>
  );
}

export default Project;
