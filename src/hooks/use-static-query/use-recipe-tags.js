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
            node_locale
            title
            id
            type
          }
        }
        recipeSpecialConsiderationTags: allContentfulRecipeSpecialConsiderationTag {
          nodes {
            node_locale
            title
            id
            type
          }
        }
        recipeSeasonTags: allContentfulRecipeSeasonTag {
          nodes {
            node_locale
            title
            id
            type
          }
        }
        recipeIngredientTags: allContentfulRecipeIngredientTag {
          node_locale
          title
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

  const courseTags = recipeCourseTags.nodes
    .filter((node) => node.node_locale === locale)
    .map(({ title, id, type }) => ({ title, id, type }));
  const specialConsiderationTags = recipeSpecialConsiderationTags.nodes
    .filter((node) => node.node_locale === locale)
    .map(({ title, id, type }) => ({ title, id, type }));
  const seasonTags = recipeSeasonTags.nodes
    .filter((node) => node.node_locale === locale)
    .map(({ title, id, type }) => ({ title, id, type }));
  const ingredientTags = recipeIngredientTags
    .filter((tag) => tag.node_locale === locale)
    .map(({ title, id, type }) => ({ title, id, type }));

  return {
    course: {
      title: tCourse,
      tags: courseTags,
    },
    specialConsideration: {
      title: tSpecialConsideration,
      tags: specialConsiderationTags,
    },
    season: {
      title: tSeason,
      tags: seasonTags,
    },
    ingredient: {
      title: tIngredient,
      tags: ingredientTags,
    },
  };
}
