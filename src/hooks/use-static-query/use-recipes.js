import { useStaticQuery, graphql } from 'gatsby';
import capitalize from '../../utils/strings';

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
            date
            heroImage {
              gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
            }
            courseTags {
              title
              id
            }
            specialConsiderationTags {
              title
              id
            }
            seasonTags {
              title
              id
            }
            ingredientTags
          }
        }
        spanishRecipes: allContentfulRecipe(
          filter: { node_locale: { eq: "es" } }
        ) {
          nodes {
            title
            slug
            id
            date
            heroImage {
              gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
            }
            courseTags {
              title
              id
            }
            specialConsiderationTags {
              title
              id
            }
            seasonTags {
              title
              id
            }
            ingredientTags
          }
        }
      }
    `
  );

  return {
    'en-US': englishRecipes.nodes.map((node) => ({
      ...node,
      tags: [].concat(
        node.courseTags?.map((tag) => ({ ...tag, type: 'course' })) ?? [],
        node.specialConsiderationTags?.map((tag) => ({
          ...tag,
          type: 'specialConsideration',
        })) ?? [],
        node.seasonTags?.map((tag) => ({
          ...tag,
          type: 'season',
        })) ?? [],
        node.ingredientTags?.map((tag) => ({
          title: capitalize(tag),
          id: tag,
          type: 'ingredient',
        })) ?? []
      ),
    })),
    es: spanishRecipes.nodes.map((node) => ({
      ...node,
      tags: [].concat(
        node.courseTags?.map((tag) => ({ ...tag, type: 'course' })) ?? [],
        node.specialConsiderationTags?.map((tag) => ({
          ...tag,
          type: 'specialConsideration',
        })) ?? [],
        node.seasonTags?.map((tag) => ({
          ...tag,
          type: 'season',
        })) ?? [],
        node.ingredientTags?.map((tag) => ({
          title: capitalize(tag),
          id: tag,
          type: 'ingredient',
        })) ?? []
      ),
    })),
  };
}
