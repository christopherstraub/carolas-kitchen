import React from 'react';
import PropTypes from 'prop-types';
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
      <main>{children}</main>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired })
    .isRequired,
  pageContext: PropTypes.shape({
    otherLocalePath: PropTypes.string.isRequired,
  }).isRequired,
};
