import { useStaticQuery, graphql } from 'gatsby';

export default function UseRecipeIngredientsStringWhitelists() {
  const { englishWhitelists, spanishWhitelists } = useStaticQuery(
    graphql`
      query RecipeIngredientStringWhitelists {
        englishWhitelists: allContentfulRecipeIngredientsStringWhitelist(
          filter: { node_locale: { eq: "en-US" } }
        ) {
          nodes {
            key
            string
          }
        }
        spanishWhitelists: allContentfulRecipeIngredientsStringWhitelist(
          filter: { node_locale: { eq: "es" } }
        ) {
          nodes {
            key
            string
          }
        }
      }
    `
  );

  const stringWhitelists = {
    'en-US': Object.fromEntries(
      englishWhitelists.nodes.map((node) => [[node.key], node.string ?? []])
    ),
    es: Object.fromEntries(
      spanishWhitelists.nodes.map((node) => [[node.key], node.string ?? []])
    ),
  };

  return stringWhitelists;
}
