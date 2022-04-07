import { useStaticQuery, graphql } from 'gatsby';

/**
 * @param {('en-US'|'es')} locale
 * @returns {Object} Translations in specified locale.
 */
export default function useAppTranslations(locale) {
  const { translations } = useStaticQuery(
    graphql`
      query AppTranslations {
        translations: allContentfulTranslations {
          nodes {
            node_locale
            translations {
              ingredients {
                title
                to
                servings
                makes
              }
              preparation {
                title
              }
              nutritionFacts {
                title
                servingsPerRecipe
                amountPerServing
                calories
                dailyValue
                totalFat
                saturatedFat
                transFat
                cholesterol
                sodium
                totalCarbohydrate
                dietaryFiber
                totalSugars
                includes
                addedSugars
                protein
                vitaminD
                calcium
                iron
                potassium
                footnote
              }
              search {
                slug
                filter
                results
                result
                sortBy
                newest
                alphabetical
                noMatches
              }
              filterModal {
                filterBy
                clearAll
              }
              recipeTags {
                course
                specialConsideration
                season
                ingredient
              }
              icons {
                burgerMenu {
                  title
                }
                close {
                  title
                  removeFilter
                }
                search {
                  title
                }
              }
            }
          }
        }
      }
    `
  );

  return translations.nodes.find((node) => node.node_locale === locale)
    .translations;
}
