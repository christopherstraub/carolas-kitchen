import React from 'react';
import { graphql, Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import useSiteMetadata from '../hooks/use-site-metadata';
import Layout from '../components/layout';
import NutritionFactsLabel from '../components/nutrition-facts-label';

export default function RecipePage({ data }) {
  const {
    title,
    slug,
    node_locale: nodeLocale,
    date,
    courseTags,
    heroImage,
    ingredients,
    preparation,
    nutritionFacts,
    seasonTags,
  } = data.allContentfulRecipe.edges[0].node;

  const dateString = new Date(date).toLocaleDateString(nodeLocale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const image = heroImage?.gatsbyImageData;

  return (
    <Layout>
      <header>
        {courseTags.map((tag) => (
          <span key={tag.slug}>
            <Link to={`/courses/${tag.slug}`}>{tag.title}</Link>
          </span>
        ))}
        <h1>{title}</h1>
        <time dateTime={date}>{dateString}</time>
        {image && <GatsbyImage image={image} alt={title} />}
      </header>
      <ul>
        <li>
          <a
            href={`mailto:?subject=${title}&body=${
              useSiteMetadata().siteUrl
            }/${slug}`}
          >
            email
          </a>
        </li>
        <li>
          <a href="#">pinterest</a>
        </li>
      </ul>
      <main>
        <section>
          <h2>Ingredients</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: ingredients.childMarkdownRemark.html,
            }}
          />
        </section>
        <section>
          <h2>Preparation</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: preparation.childMarkdownRemark.html,
            }}
          />
        </section>
      </main>
      {nutritionFacts && (
        <details>
          <summary>
            <h2>Nutrition Facts</h2>
          </summary>
          <NutritionFactsLabel
            nutritionFacts={nutritionFacts}
            servingsLocal={null}
          />
        </details>
      )}
    </Layout>
  );
}

export const query = graphql`
  query RecipeQuery($id: String) {
    allContentfulRecipe(filter: { id: { eq: $id } }) {
      edges {
        node {
          title
          slug
          node_locale
          date
          courseTags {
            title
            slug
          }
          heroImage {
            gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
          }
          ingredients {
            childMarkdownRemark {
              html
            }
          }
          preparation {
            childMarkdownRemark {
              html
            }
          }
          nutritionFacts {
            measures {
              name
              value
              id
            }
            defaultMeasureId
            nutrients {
              amount
              id
            }
          }
          seasonTags {
            title
            slug
          }
        }
      }
    }
  }
`;
