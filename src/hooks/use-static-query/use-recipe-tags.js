import { useStaticQuery, graphql } from 'gatsby';
import useAppTranslations from './use-app-translations';

/**
 * @param {('en-US'|'es')} locale
 * @returns {Object} Recipe tags in specified locale.
 */
export default function useRecipeTags(locale) {
  const {
    allContentfulRecipeCourseTags,
    allContentfulRecipeSpecialConsiderationTags,
    allContentfulRecipeSeasonTags,
    allContentfulRecipeIngredientTags,
  } = useStaticQuery(
    graphql`
      query RecipeTags {
        allContentfulRecipeCourseTags {
          nodes {
            title
            node_locale
            id
            type
          }
        }
        allContentfulRecipeSpecialConsiderationTags {
          nodes {
            title
            node_locale
            id
            type
          }
        }
        allContentfulRecipeSeasonTags {
          nodes {
            title
            node_locale
            id
            type
          }
        }
        allContentfulRecipeIngredientTags {
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

  const courseTags = allContentfulRecipeCourseTags.nodes.filter(
    (node) => node.node_locale === locale
  );
  const specialConsiderationTags =
    allContentfulRecipeSpecialConsiderationTags.nodes.filter(
      (node) => node.node_locale === locale
    );
  const seasonTags = allContentfulRecipeSeasonTags.nodes.filter(
    (node) => node.node_locale === locale
  );
  const ingredientTags = allContentfulRecipeIngredientTags.filter(
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
