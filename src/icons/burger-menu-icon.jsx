import React from 'react';
import * as styles from './burger-menu-icon.module.scss';

export default function BurgerMenuIcon() {
  return (
    <svg
      viewBox="0 0 20 10"
      width="20"
      height="10"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="1"
        y1="1"
        x2="19"
        y2="1"
        strokeWidth="2"
        strokeLinecap="round"
        className={styles.line}
      />
      <line
        x1="1"
        y1="5"
        x2="19"
        y2="5"
        strokeWidth="2"
        strokeLinecap="round"
        className={styles.line}
      />
      <line
        x1="1"
        y1="9"
        x2="19"
        y2="9"
        strokeWidth="2"
        strokeLinecap="round"
        className={styles.line}
      />
    </svg>
  );
}
