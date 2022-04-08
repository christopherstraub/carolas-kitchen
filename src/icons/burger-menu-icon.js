import React from 'react';
import PropTypes from 'prop-types';
import useAppTranslations from '../hooks/use-static-query/use-app-translations';

export default function BurgerMenuIcon({ locale }) {
  const { title: tTitle } = useAppTranslations(locale).icons.burgerMenu;

  return (
    <svg
      viewBox="0 0 20 10"
      width="20"
      height="10"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{tTitle}</title>
      <line
        x1="1"
        y1="1"
        x2="19"
        y2="1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="1"
        y1="5"
        x2="19"
        y2="5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="1"
        y1="9"
        x2="19"
        y2="9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

BurgerMenuIcon.propTypes = {
  locale: PropTypes.string.isRequired,
};
