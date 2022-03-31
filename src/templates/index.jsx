import React from 'react';
import { graphql, Link } from 'gatsby';
import { getLocalizedPathFromSlug } from '../i18n';
import useSiteMetadata from '../hooks/use-static-query/use-site-metadata';

export default function IndexPageTemplate({ data, pageContext }) {
  const courseTags = data.recipeCourseTags.nodes;

  const { locale } = pageContext;

  return (
    <main>
      <header>
        <h1>{useSiteMetadata().title}</h1>
      </header>
      <ul>
        {courseTags.map((tag) => (
          <li key={tag.slug}>
            <Link to={getLocalizedPathFromSlug(tag.slug, locale)}>
              {tag.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

export const query = graphql`
  query RecipeCourseTags($locale: String!) {
    recipeCourseTags: allContentfulRecipeCourseTags(
      filter: { node_locale: { eq: $locale } }
    ) {
      nodes {
        title
        slug
      }
    }
  }
`;
