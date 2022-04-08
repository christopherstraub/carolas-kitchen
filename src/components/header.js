import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { getLocalizedPath, getLocalizedPathFromSlug } from '../i18n';
import useAppTranslations from '../hooks/use-static-query/use-app-translations';
import useSiteMetadata from '../hooks/use-static-query/use-site-metadata';
import LanguageSwitcher from './language-switcher';
import LanguageSwitcherNotFoundPage from './language-switcher-404-page';
import BurgerMenuIcon from '../icons/burger-menu-icon';
import SearchIcon from '../icons/search-icon';

export default function Header({
  locale,
  path,
  otherLocalePath,
  onNotFoundPage,
}) {
  const { slug: tSearchSlug } = useAppTranslations(locale).search;

  return (
    <header>
      <BurgerMenuIcon locale={locale} />
      <span>
        <Link to={getLocalizedPath('/', locale)}>
          {useSiteMetadata().title}
        </Link>
      </span>
      {!onNotFoundPage ? (
        <LanguageSwitcher
          locale={locale}
          path={path}
          otherLocalePath={otherLocalePath}
        />
      ) : (
        <LanguageSwitcherNotFoundPage locale={locale} />
      )}

      <Link to={getLocalizedPathFromSlug(tSearchSlug, locale)}>
        <SearchIcon locale={locale} />
      </Link>
    </header>
  );
}

Header.propTypes = {
  locale: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  otherLocalePath: PropTypes.string,
  onNotFoundPage: PropTypes.bool,
};
Header.defaultProps = { otherLocalePath: null, onNotFoundPage: false };
