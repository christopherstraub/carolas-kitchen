import { useStaticQuery, graphql } from 'gatsby';

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
            type
          }
        }
        englishSpecialConsiderationTags: allContentfulRecipeSpecialConsiderationTags(
          filter: { node_locale: { eq: "en-US" } }
        ) {
          nodes {
            title
            id
            type
          }
        }
        englishSeasonTags: allContentfulRecipeSeasonTags(
          filter: { node_locale: { eq: "en-US" } }
        ) {
          nodes {
            title
            id
            type
          }
        }
        englishIngredientTags: allContentfulRecipeIngredientTags(
          node_locale: "en-US"
        ) {
          title
          id
          type
        }
        spanishCourseTags: allContentfulRecipeCourseTags(
          filter: { node_locale: { eq: "es" } }
        ) {
          nodes {
            title
            id
            type
          }
        }
        spanishSpecialConsiderationTags: allContentfulRecipeSpecialConsiderationTags(
          filter: { node_locale: { eq: "es" } }
        ) {
          nodes {
            title
            id
            type
          }
        }
        spanishSeasonTags: allContentfulRecipeSeasonTags(
          filter: { node_locale: { eq: "es" } }
        ) {
          nodes {
            title
            id
            type
          }
        }
        spanishIngredientTags: allContentfulRecipeIngredientTags(
          node_locale: "es"
        ) {
          title
          id
          type
        }
      }
    `
  );

  return {
    'en-US': {
      course: {
        title: 'Course',
        options: englishCourseTags.nodes,
      },
      specialConsideration: {
        title: 'Special Consideration',
        options: englishSpecialConsiderationTags.nodes,
      },
      season: {
        title: 'Season',
        options: englishSeasonTags.nodes,
      },
      ingredient: {
        title: 'Ingredient',
        options: englishIngredientTags,
      },
    },
    es: {
      course: {
        title: 'Curso',
        options: spanishCourseTags.nodes,
      },
      specialConsideration: {
        title: 'Consideración Especial',
        options: spanishSpecialConsiderationTags.nodes,
      },
      season: {
        title: 'Temporada',
        options: spanishSeasonTags.nodes,
      },
      ingredient: {
        title: 'Ingrediente',
        options: spanishIngredientTags,
      },
    },
  };
}
