import React from 'react';
import unitedStates from '../images/united-states-flag.svg';
import spain from '../images/spain-flag.svg';

const localeFlags = {
  'en-US': { src: unitedStates, title: 'View page in English' },
  'es': { src: spain, title: 'Ver página en español' },
};

export default function FlagIcon({ locale }) {
  const { src, title } = localeFlags[locale];

  return <img src={src} alt={title} title={title} width="32" height="16" />;
}
