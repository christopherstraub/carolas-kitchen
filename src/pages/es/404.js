import PropTypes from 'prop-types';
import SEO from '../../components/seo';

export default function NotFoundPage({ location: { pathname } }) {
  return (
    <>
      <SEO locale="es" pathname={pathname} title="Página No Encontrada" />
      <h1>404</h1>
      <p>Disculpa, la página que busca no existe.</p>
    </>
  );
}

NotFoundPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
