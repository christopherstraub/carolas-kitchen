import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { locales, getLocalizedPath } from '../i18n';
import FlagIcon from '../icons/flag-icon';
import * as styles from './language-switcher.module.scss';

const localeLinkTitles = {
  'en-US': 'Go to homepage',
  'es': 'Ir a página principal',
};

export default function LanguageSwitcherNotFoundPage({ locale }) {
  return (
    <ul>
      {locales.map((l) => (
        <li key={l}>
          <Link
            to={getLocalizedPath('/', l)}
            getProps={() =>
              l === locale
                ? { className: `${styles.link} ${styles.active}` }
                : { className: styles.link }
            }
          >
            <FlagIcon locale={l} title={localeLinkTitles[l]} />
          </Link>
        </li>
      ))}
    </ul>
  );
}

LanguageSwitcherNotFoundPage.propTypes = {
  locale: PropTypes.string.isRequired,
};
