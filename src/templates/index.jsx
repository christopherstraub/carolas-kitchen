import React from 'react';
import { graphql, Link } from 'gatsby';
import { getLocalizedPathFromSlug } from '../i18n';
import useSiteMetadata from '../hooks/use-static-query/use-site-metadata';

export default function IndexPageTemplate({ data, pageContext }) {
  const courses = data.allContentfulRecipeCourseTags.nodes;
  const { locale } = pageContext;

  return (
    <main>
      <header>
        <h1>{useSiteMetadata().title}</h1>
      </header>
      <ul>
        {courses.map((course) => (
          <li key={course.slug}>
            <Link to={getLocalizedPathFromSlug(course.slug, locale)}>
              {course.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

export const query = graphql`
  query RecipeCourseTags($locale: String!) {
    allContentfulRecipeCourseTags(filter: { node_locale: { eq: $locale } }) {
      nodes {
        title
        slug
      }
    }
  }
`;
