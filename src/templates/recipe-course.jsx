import React from 'react';
import { graphql, Link } from 'gatsby';
import { getLocalizedPathFromSlug } from '../i18n';

export default function RecipeCoursePage({ data }) {
  const { title, node_locale: locale } = data.recipeCourseTag;

  const recipes = data.recipes.nodes;

  return (
    <main>
      <h1>{title}</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.slug}>
            <Link to={getLocalizedPathFromSlug(recipe.slug, locale)}>
              {recipe.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

export const query = graphql`
  query RecipeCourseTagLinks($id: String!) {
    recipeCourseTag: contentfulRecipeCourseTags(id: { eq: $id }) {
      title
      slug
      node_locale
    }
    recipes: allContentfulRecipe(
      filter: { courseTags: { elemMatch: { id: { eq: $id } } } }
    ) {
      nodes {
        title
        slug
      }
    }
  }
`;
