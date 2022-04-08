import PropTypes from 'prop-types';
import { getLocaleFromPath } from '../i18n';
import Header from './header';

export default function Layout({ children, location, pageContext }) {
  const locale = getLocaleFromPath(location.pathname);
  const { pathname } = location;
  const { otherLocalePath, onNotFoundPage } = pageContext;

  return (
    <>
      <Header
        locale={locale}
        path={pathname}
        otherLocalePath={otherLocalePath}
        onNotFoundPage={onNotFoundPage}
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
    otherLocalePath: PropTypes.string,
    onNotFoundPage: PropTypes.bool,
  }).isRequired,
};
