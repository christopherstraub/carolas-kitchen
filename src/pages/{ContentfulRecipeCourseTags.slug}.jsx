import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';

export default function RecipeCoursePage({ data }) {
  const { title, slug } = data.allContentfulRecipeCourseTags.nodes[0];

  const recipes = data.allContentfulRecipe.nodes;

  return (
    <Layout>
      <h1>{title}</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.slug}>
            <Link to={`/${recipe.slug}`}>{recipe.title}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export const query = graphql`
  query RecipeMealCourseTag($id: String) {
    allContentfulRecipeCourseTags(filter: { id: { eq: $id } }) {
      nodes {
        title
        slug
        node_locale
      }
    }
    allContentfulRecipe(
      filter: { courseTags: { elemMatch: { id: { eq: $id } } } }
    ) {
      nodes {
        title
        slug
      }
    }
  }
`;
