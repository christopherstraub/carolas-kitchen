import React from 'react';
import { graphql, Link } from 'gatsby';
import useSiteMetadata from '../hooks/use-static-query/use-site-metadata';

export default function HomePage({ data }) {
  const englishCourses = data.englishCourses.nodes;
  const spanishCourses = data.spanishCourses.nodes;

  return (
    <main>
      <header>
        <h1>{useSiteMetadata().title}</h1>
      </header>
      <section>
        <h2>English</h2>
        <ul>
          {englishCourses.map((course) => (
            <li key={course.slug}>
              <Link to={`/${course.slug}`}>{course.title}</Link>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Spanish</h2>
        <ul>
          {spanishCourses.map((course) => (
            <li key={course.slug}>
              <Link to={`/${course.slug}`}>{course.title}</Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export const query = graphql`
  query HomePage {
    englishCourses: allContentfulRecipeCourseTags(
      filter: { node_locale: { eq: "en-US" } }
    ) {
      nodes {
        title
        slug
      }
    }
    spanishCourses: allContentfulRecipeCourseTags(
      filter: { node_locale: { eq: "es" } }
    ) {
      nodes {
        title
        slug
      }
    }
  }
`;
