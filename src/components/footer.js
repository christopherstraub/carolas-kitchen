import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import slugify from 'slugify';
import {
  locales,
  localeLanguages,
  getLocalizedPath,
  getLocalizedPathFromSlug,
} from '../i18n';
import useSiteMetadata from '../hooks/use-static-query/use-site-metadata';
import useAppTranslations from '../hooks/use-static-query/use-app-translations';
import * as styles from './footer.module.scss';

export default function Footer({
  locale,
  path,
  alternateLocalePath,
  onNotFoundPage,
}) {
  // List of locales with current locale first.
  const orderedLocales = [locale].concat(locales.filter((l) => l !== locale));

  const { title } = useSiteMetadata();

  const {
    home: tHome,
    recipes: tRecipes,
    about: tAbout,
    blog: tBlog,
    search: tSearch,
    language: tLanguage,
    legal: tLegal,
    termsOfUse: tTermsOfUse,
    privacyPolicy: tPrivacyPolicy,
    cookieSettings: tCookieSettings,
    allRightsReserved: tAllRightsReserved,
    websiteDevelopedBy: tWebsiteDevelopedBy,
  } = useAppTranslations(locale).footer;

  return (
    <footer>
      <section>
        <h2>{title.toUpperCase()}</h2>
        <ul>
          <li>
            <Link
              to={getLocalizedPath('/', locale)}
              activeClassName={styles.active}
            >
              {tHome}
            </Link>
          </li>
          {[tRecipes, tAbout, tBlog, tSearch].map((link) => (
            <li key={link}>
              <Link
                to={getLocalizedPathFromSlug(
                  slugify(link, { lower: true }),
                  locale
                )}
                activeClassName={styles.active}
              >
                {link}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>{tLanguage}</h2>
        <ul>
          {orderedLocales.map((l) => (
            <li key={l}>
              <Link
                to={
                  /**
                   * If on 404 page, language links link to the index page in
                   * their respective locale.
                   */
                  // eslint-disable-next-line no-nested-ternary
                  !onNotFoundPage
                    ? l === locale
                      ? path
                      : alternateLocalePath
                    : getLocalizedPath('/', l)
                }
                getProps={() =>
                  l === locale ? { className: styles.active } : {}
                }
              >
                {localeLanguages[l]}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>{tLegal}</h2>
        <ul>
          {[tTermsOfUse, tPrivacyPolicy].map((link) => (
            <li key={link}>
              <Link
                to={getLocalizedPathFromSlug(
                  slugify(link, { lower: true }),
                  locale
                )}
                activeClassName={styles.active}
              >
                {link}
              </Link>
            </li>
          ))}
          <li>
            <button type="button">{tCookieSettings}</button>
          </li>
        </ul>
      </section>
      <section>
        <h2>{title}</h2>
        <p>{`© ${new Date().getFullYear()} ${title}. ${tAllRightsReserved}.`}</p>
        <p>
          {tWebsiteDevelopedBy}{' '}
          <a href="https://christopherstraub.me/">Christopher Straub</a>.
        </p>
      </section>
    </footer>
  );
}

Footer.propTypes = {
  locale: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  alternateLocalePath: PropTypes.string,
  onNotFoundPage: PropTypes.bool,
};
Footer.defaultProps = { alternateLocalePath: null, onNotFoundPage: false };
