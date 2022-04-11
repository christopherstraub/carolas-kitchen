import PropTypes from 'prop-types';
import SEO from '../components/seo';

export default function NotFoundPage({ location: { pathname } }) {
  return (
    <>
      <SEO locale="en-US" pathname={pathname} title="Page Not Found" />
      <h1>404</h1>
      <p>{`Sorry, the page you're looking for doesn't exist.`}</p>
    </>
  );
}

NotFoundPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
