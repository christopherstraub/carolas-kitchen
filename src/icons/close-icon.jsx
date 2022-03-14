import React from 'react';

export default function CloseIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      width="20"
      height="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="1"
        y1="1"
        x2="19"
        y2="19"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <line
        x1="1"
        y1="19"
        x2="19"
        y2="1"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </svg>
  );
}
