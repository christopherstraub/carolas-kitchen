import React from 'react';
import * as styles from './filter-icon.module.scss';

export default function FilterIcon() {
  return (
    <svg viewBox="0 0 20 12" width="20" height="12">
      <line
        x1="1"
        y1="2"
        x2="19"
        y2="2"
        strokeLinecap="round"
        className={styles.slider}
      />
      <circle cx="14" cy="2" r="1.5" className={styles.indicator} />
      <line
        x1="1"
        y1="6"
        x2="19"
        y2="6"
        strokeLinecap="round"
        className={styles.slider}
      />
      <circle cx="6" cy="6" r="1.5" className={styles.indicator} />
      <line
        x1="1"
        y1="10"
        x2="19"
        y2="10"
        strokeLinecap="round"
        className={styles.slider}
      />
      <circle cx="14" cy="10" r="1.5" className={styles.indicator} />
    </svg>
  );
}
