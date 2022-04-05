import React from 'react';
import PropTypes from 'prop-types';
import { getLocaleFromPath } from '../i18n';
import useAppTranslations from '../hooks/use-static-query/use-app-translations';

export default function NotFoundPage({ location }) {
  const locale = getLocaleFromPath(location.pathname);
  const { main: tMain } = useAppTranslations(locale).notFound;

  return <main>{tMain}</main>;
}

NotFoundPage.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired })
    .isRequired,
};
