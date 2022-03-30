import React from 'react';
import { getLocaleFromPath } from '../i18n';
import Header from './header';

export default function Layout({ children, location, pageContext }) {
  const locale = getLocaleFromPath(location.pathname);
  const { otherLocalePath } = pageContext;

  return (
    <>
      <Header
        locale={locale}
        path={location.pathname}
        otherLocalePath={otherLocalePath}
      />
      {children}
    </>
  );
}
