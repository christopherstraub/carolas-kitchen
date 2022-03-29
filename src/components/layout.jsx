import React from 'react';
import { getLocaleFromPath } from '../i18n';
import Header from './header';

export default function Layout({ children, location }) {
  const locale = getLocaleFromPath(location.pathname);

  return (
    <>
      <Header locale={locale} />
      {children}
    </>
  );
}
