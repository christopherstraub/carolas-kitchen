import React from 'react';
import PropTypes from 'prop-types';
import unitedStates from '../images/united-states-flag.svg';
import spain from '../images/spain-flag.svg';

const localeFlags = {
  'en-US': { src: unitedStates, defaultTitle: 'View page in English' },
  'es': { src: spain, defaultTitle: 'Ver página en español' },
};

export default function FlagIcon({ locale, title }) {
  const { src, defaultTitle } = localeFlags[locale];

  return (
    <img
      src={src}
      alt={title ?? defaultTitle}
      title={title ?? defaultTitle}
      width="38"
      height="20"
    />
  );
}

FlagIcon.propTypes = {
  locale: PropTypes.string.isRequired,
  title: PropTypes.string,
};
FlagIcon.defaultProps = {
  title: null,
};
