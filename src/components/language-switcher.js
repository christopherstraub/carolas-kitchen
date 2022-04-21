import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { getLocales } from '../i18n';
import FlagIcon from '../icons/flag-icon';
import * as styles from './language-switcher.module.scss';

export default function LanguageSwitcher({
  locale,
  path,
  alternateLocalePath,
}) {
  return (
    <ul>
      {getLocales().map((l) => (
        <li key={l}>
          <Link
            to={l === locale ? path : alternateLocalePath}
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

LanguageSwitcher.propTypes = {
  locale: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  alternateLocalePath: PropTypes.string.isRequired,
};
