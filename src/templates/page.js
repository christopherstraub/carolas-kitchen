import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import SEO from '../components/seo';

export default function PageTemplate({
  data: { page },
  pageContext: { alternateLocalePath },
}) {
  const { title, node_locale: locale, body } = page;

  return (
    <>
      <SEO
        locale={locale}
        alternatePathname={alternateLocalePath}
        title={title}
      />
      <h1>{title}</h1>
      <div
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: body.childMarkdownRemark.html }}
      />
    </>
  );
}

export const query = graphql`
  query Page($id: String!) {
    page: contentfulPage(id: { eq: $id }) {
      title
      node_locale
      body {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;

PageTemplate.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.shape({
      title: PropTypes.string.isRequired,
      node_locale: PropTypes.string.isRequired,
      body: PropTypes.shape({
        childMarkdownRemark: PropTypes.shape({
          html: PropTypes.string.isRequired,
        }),
      }),
    }),
  }).isRequired,
  pageContext: PropTypes.shape({
    alternateLocalePath: PropTypes.string.isRequired,
  }).isRequired,
};
