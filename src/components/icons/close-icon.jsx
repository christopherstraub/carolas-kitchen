import React from 'react';
import * as styles from './close-icon.module.scss';

export default function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20">
      <line
        x1="1"
        y1="1"
        x2="19"
        y2="19"
        strokeLinecap="round"
        className={styles.line}
      />
      <line
        x1="1"
        y1="19"
        x2="19"
        y2="1"
        strokeLinecap="round"
        className={styles.line}
      />
    </svg>
  );
}
