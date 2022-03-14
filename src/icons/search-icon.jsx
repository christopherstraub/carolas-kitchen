import React from 'react';
import clsx from 'clsx';
import * as styles from './search-icon.module.scss';

export default function SearchIcon({ light }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      className={light ? styles.light : styles.normal}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="6" cy="6" r="5" fill="none" />
      <line
        x1="10"
        y1="10"
        x2="15"
        y2="15"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
