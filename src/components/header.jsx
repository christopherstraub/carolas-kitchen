import React from 'react';
import { Link } from 'gatsby';
import { getLocalizedPath, getLocalizedPathFromSlug } from '../i18n';
import useAppTranslations from '../hooks/use-static-query/use-app-translations';
import useSiteMetadata from '../hooks/use-static-query/use-site-metadata';
import LanguageSwitcher from './language-switcher';
import BurgerMenuIcon from '../icons/burger-menu-icon';
import SearchIcon from '../icons/search-icon';

export default function Header({ locale, path, otherLocalePath }) {
  const { slug: tSearchSlug } = useAppTranslations(locale).search;

  return (
    <header>
      <BurgerMenuIcon locale={locale} />
      <span>
        <Link to={getLocalizedPath('/', locale)}>
          {useSiteMetadata().title}
        </Link>
      </span>
      <LanguageSwitcher
        locale={locale}
        path={path}
        otherLocalePath={otherLocalePath}
      />
      <Link to={getLocalizedPathFromSlug(tSearchSlug, locale)}>
        <SearchIcon locale={locale} />
      </Link>
    </header>
  );
}
