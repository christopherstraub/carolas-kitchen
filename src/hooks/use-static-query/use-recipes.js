import { useStaticQuery, graphql } from 'gatsby';

/**
 * @param {('en-US'|'es')} locale
 * @returns {Object} Recipes in specified locale.
 */
export default function useRecipes(locale) {
  const { allContentfulRecipe } = useStaticQuery(
    graphql`
      query Recipes {
        allContentfulRecipe {
          nodes {
            node_locale
            title
            slug
            id
            publishDate
            heroImage {
              gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
            }
            courseTags {
              title
              id
              type
            }
            specialConsiderationTags {
              title
              id
              type
            }
            seasonTags {
              title
              id
              type
            }
            ingredientTags {
              title
              id
              type
            }
          }
        }
      }
    `
  );

  return allContentfulRecipe.nodes
    .filter((node) => node.node_locale === locale)
    .map((node) => {
      const courseTags = node.courseTags ?? [];
      const specialConsiderationTags = node.specialConsiderationTags ?? [];
      const seasonTags = node.seasonTags ?? [];
      const ingredientTags = node.ingredientTags ?? [];

      return {
        ...node,
        tags: [
          ...courseTags,
          ...specialConsiderationTags,
          ...seasonTags,
          ...ingredientTags,
        ],
      };
    });
}
