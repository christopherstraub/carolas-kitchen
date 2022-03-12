import { useStaticQuery, graphql } from 'gatsby';
import capitalize from '../../utils/strings';

export default function useRecipeTags() {
  const {
    englishCourseTags,
    englishSpecialConsiderationTags,
    englishSeasonTags,
    englishIngredientTags,
    spanishCourseTags,
    spanishSpecialConsiderationTags,
    spanishSeasonTags,
    spanishIngredientTags,
  } = useStaticQuery(
    graphql`
      query RecipeTags {
        englishCourseTags: allContentfulRecipeCourseTags(
          filter: { node_locale: { eq: "en-US" } }
        ) {
          nodes {
            title
            id
          }
        }
        englishSpecialConsiderationTags: allContentfulRecipeSpecialConsiderationTags(
          filter: { node_locale: { eq: "en-US" } }
        ) {
          nodes {
            title
            id
          }
        }
        englishSeasonTags: allContentfulRecipeSeasonTags(
          filter: { node_locale: { eq: "en-US" } }
        ) {
          nodes {
            title
            id
          }
        }
        englishIngredientTags: allContentfulRecipe(
          filter: { node_locale: { eq: "en-US" } }
        ) {
          nodes {
            ingredientTags
          }
        }
        spanishCourseTags: allContentfulRecipeCourseTags(
          filter: { node_locale: { eq: "es" } }
        ) {
          nodes {
            title
            id
          }
        }
        spanishSpecialConsiderationTags: allContentfulRecipeSpecialConsiderationTags(
          filter: { node_locale: { eq: "es" } }
        ) {
          nodes {
            title
            id
          }
        }
        spanishSeasonTags: allContentfulRecipeSeasonTags(
          filter: { node_locale: { eq: "es" } }
        ) {
          nodes {
            title
            id
          }
        }
        spanishIngredientTags: allContentfulRecipe(
          filter: { node_locale: { eq: "es" } }
        ) {
          nodes {
            ingredientTags
          }
        }
      }
    `
  );

  const uniqueEnglishIngredientTags = [
    ...new Set(
      englishIngredientTags.nodes.flatMap((node) => node.ingredientTags)
    ),
  ].filter((tag) => tag);

  const uniqueSpanishIngredientTags = [
    ...new Set(
      spanishIngredientTags.nodes.flatMap((node) => node.ingredientTags)
    ),
  ].filter((tag) => tag);

  return {
    'en-US': [
      {
        title: 'Course',
        options: englishCourseTags.nodes.map((node) => ({
          ...node,
          type: 'course',
        })),
      },
      {
        title: 'Special Consideration',
        options: englishSpecialConsiderationTags.nodes.map((node) => ({
          ...node,
          type: 'specialConsideration',
        })),
      },
      {
        title: 'Season',
        options: englishSeasonTags.nodes.map((node) => ({
          ...node,
          type: 'season',
        })),
      },
      {
        title: 'Ingredient',
        options: uniqueEnglishIngredientTags.map((tag) => ({
          title: capitalize(tag),
          id: tag,
          type: 'ingredient',
        })),
      },
    ],

    es: [
      {
        title: 'Curso',
        options: spanishCourseTags.nodes.map((node) => ({
          ...node,
          type: 'course',
        })),
      },
      {
        title: 'Consideración Especial',
        options: spanishSpecialConsiderationTags.nodes.map((node) => ({
          ...node,
          type: 'specialConsideration',
        })),
      },
      {
        title: 'Temporada',
        options: spanishSeasonTags.nodes.map((node) => ({
          ...node,
          type: 'season',
        })),
      },
      {
        title: 'Ingrediente',
        options: uniqueSpanishIngredientTags.map((tag) => ({
          title: capitalize(tag),
          id: tag,
          type: 'ingredient',
        })),
      },
    ],
  };
}
