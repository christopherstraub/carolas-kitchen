import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import { getLocalizedPathFromSlug } from '../i18n';

export default function RecipeCourseTemplate({ data }) {
  const { title, node_locale: locale } = data.recipeCourseTag;

  const recipes = data.recipes.nodes;

  return (
    <>
      <h1>{title}</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.slug}>
            <Link to={getLocalizedPathFromSlug(recipe.slug, locale)}>
              {recipe.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export const query = graphql`
  query RecipeCourseTagLinks($id: String!) {
    recipeCourseTag: contentfulRecipeCourseTag(id: { eq: $id }) {
      title
      node_locale
    }
    recipes: allContentfulRecipe(
      filter: { courseTags: { elemMatch: { id: { eq: $id } } } }
    ) {
      nodes {
        title
        slug
      }
    }
  }
`;

RecipeCourseTemplate.propTypes = {
  data: PropTypes.shape({
    recipeCourseTag: PropTypes.shape({
      title: PropTypes.string.isRequired,
      node_locale: PropTypes.string.isRequired,
    }).isRequired,
    recipes: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          slug: PropTypes.string.isRequired,
        })
      ).isRequired,
    }),
  }).isRequired,
};
