import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import { getLocalizedPathFromSlug } from '../i18n';
import SEO from '../components/seo';

export default function IndexTemplate({
  data,
  pageContext: { locale, alternateLocalePath },
}) {
  const courseTags = data.recipeCourseTags.nodes;

  return (
    <>
      <SEO locale={locale} alternatePathname={alternateLocalePath} />
      <ul>
        {courseTags.map((tag) => (
          <li key={tag.slug}>
            <Link to={getLocalizedPathFromSlug(tag.slug, locale)}>
              {tag.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export const query = graphql`
  query RecipeCourseTags($locale: String!) {
    recipeCourseTags: allContentfulRecipeCourseTag(
      filter: { node_locale: { eq: $locale } }
    ) {
      nodes {
        title
        slug
      }
    }
  }
`;

IndexTemplate.propTypes = {
  data: PropTypes.shape({
    recipeCourseTags: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          slug: PropTypes.string.isRequired,
        })
      ),
    }),
  }).isRequired,
  pageContext: PropTypes.shape({
    locale: PropTypes.string.isRequired,
    alternateLocalePath: PropTypes.string.isRequired,
  }).isRequired,
};
