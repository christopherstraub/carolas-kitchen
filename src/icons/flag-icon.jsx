import React from 'react';
import PropTypes from 'prop-types';
import unitedStates from '../images/united-states-flag.svg';
import spain from '../images/spain-flag.svg';

const localeFlags = {
  'en-US': { src: unitedStates, title: 'View page in English' },
  'es': { src: spain, title: 'Ver página en español' },
};

export default function FlagIcon({ locale }) {
  const { src, title } = localeFlags[locale];

  return <img src={src} alt={title} title={title} width="38" height="20" />;
}

FlagIcon.propTypes = {
  locale: PropTypes.string.isRequired,
};
