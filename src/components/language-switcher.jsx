import React from 'react';
import { Link } from 'gatsby';
import { locales } from '../i18n';
import FlagIcon from '../icons/flag-icon';
import * as styles from './language-switcher.module.scss';

export default function LanguageSwitcher({ locale, path, otherLocalePath }) {
  return (
    <ul>
      {locales.map((l) => (
        <li>
          <Link
            to={l === locale ? path : otherLocalePath}
            className={styles.link}
            activeClassName={styles.active}
          >
            <FlagIcon locale={l} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
