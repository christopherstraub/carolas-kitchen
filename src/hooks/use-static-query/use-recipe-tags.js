import { useStaticQuery, graphql } from 'gatsby';
import useAppTranslations from './use-app-translations';

/**
 * @param {('en-US'|'es')} locale
 * @returns {Object} Recipe tags in specified locale.
 */
export default function useRecipeTags(locale) {
  const {
    recipeCourseTags,
    recipeSpecialConsiderationTags,
    recipeSeasonTags,
    recipeIngredientTags,
  } = useStaticQuery(
    graphql`
      query RecipeTags {
        recipeCourseTags: allContentfulRecipeCourseTag {
          nodes {
            title
            node_locale
            id
            type
          }
        }
        recipeSpecialConsiderationTags: allContentfulRecipeSpecialConsiderationTag {
          nodes {
            title
            node_locale
            id
            type
          }
        }
        recipeSeasonTags: allContentfulRecipeSeasonTag {
          nodes {
            title
            node_locale
            id
            type
          }
        }
        recipeIngredientTags: allContentfulRecipeIngredientTag {
          title
          node_locale
          id
          type
        }
      }
    `
  );

  const {
    course: tCourse,
    specialConsideration: tSpecialConsideration,
    season: tSeason,
    ingredient: tIngredient,
  } = useAppTranslations(locale).recipeTags;

  const courseTags = recipeCourseTags.nodes.filter(
    (node) => node.node_locale === locale
  );
  const specialConsiderationTags = recipeSpecialConsiderationTags.nodes.filter(
    (node) => node.node_locale === locale
  );
  const seasonTags = recipeSeasonTags.nodes.filter(
    (node) => node.node_locale === locale
  );
  const ingredientTags = recipeIngredientTags.filter(
    (tag) => tag.node_locale === locale
  );

  return {
    course: {
      title: tCourse,
      options: courseTags,
    },
    specialConsideration: {
      title: tSpecialConsideration,
      options: specialConsiderationTags,
    },
    season: {
      title: tSeason,
      options: seasonTags,
    },
    ingredient: {
      title: tIngredient,
      options: ingredientTags,
    },
  };
}
