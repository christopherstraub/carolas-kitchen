import React from 'react';
import { graphql, Link } from 'gatsby';
import useSiteMetadata from '../hooks/use-site-metadata';
import Layout from '../components/layout';

export default function HomePage({ data }) {
  const englishCourses = data.englishCourses.nodes;
  const spanishCourses = data.spanishCourses.nodes;

  return (
    <Layout>
      <header>
        <h1>{useSiteMetadata().title}</h1>
      </header>
      <main>
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
    </Layout>
  );
}

export const query = graphql`
  query HomePageQuery {
    englishCourses: allContentfulRecipeMealCourse(
      filter: { node_locale: { eq: "en-US" } }
    ) {
      nodes {
        title
        slug
      }
    }
    spanishCourses: allContentfulRecipeMealCourse(
      filter: { node_locale: { eq: "es" } }
    ) {
      nodes {
        title
        slug
      }
    }
  }
`;
