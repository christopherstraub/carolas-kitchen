import React from 'react';

export default function FilterIcon() {
  return (
    <svg
      viewBox="0 0 20 12"
      width="20"
      height="12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="1"
        y1="2"
        x2="19"
        y2="2"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <circle cx="14" cy="2" r="1.5" fill="currentColor" />
      <line
        x1="1"
        y1="6"
        x2="19"
        y2="6"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <circle cx="6" cy="6" r="1.5" fill="currentColor" />
      <line
        x1="1"
        y1="10"
        x2="19"
        y2="10"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <circle cx="14" cy="10" r="1.5" fill="currentColor" />
    </svg>
  );
}
