import React from 'react';
import * as styles from './search-icon.module.scss';

export default function SearchIcon({ light }) {
  return (
    <svg
      viewBox="0 0 20 20"
      width="20"
      height="20"
      className={light && styles.light}
    >
      <circle cx="7" cy="7" r="7" className={styles.frame} />
      <circle cx="7" cy="7" r="6" className={styles.lens} />
      <line
        x1="12"
        y1="12"
        x2="19"
        y2="19"
        strokeWidth="2"
        strokeLinecap="round"
        className={styles.handle}
      />
    </svg>
  );
}
