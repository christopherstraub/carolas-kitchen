import PropTypes from 'prop-types';
import { getLocaleFromPath } from '../i18n';
import useAppTranslations from '../hooks/use-static-query/use-app-translations';

export default function NotFoundPage({ location }) {
  const locale = getLocaleFromPath(location.pathname);
  const { notFound: tNotFound } = useAppTranslations(locale);

  return tNotFound;
}

NotFoundPage.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired })
    .isRequired,
};
