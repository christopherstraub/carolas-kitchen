import { useStaticQuery, graphql } from 'gatsby';

export default function useRecipes() {
  const { englishRecipes, spanishRecipes } = useStaticQuery(
    graphql`
      query Recipes {
        englishRecipes: allContentfulRecipe(
          filter: { node_locale: { eq: "en-US" } }
        ) {
          nodes {
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
        spanishRecipes: allContentfulRecipe(
          filter: { node_locale: { eq: "es" } }
        ) {
          nodes {
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

  return {
    'en-US': englishRecipes.nodes.map((node) => {
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
    }),
    es: spanishRecipes.nodes.map((node) => {
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
    }),
  };
}
