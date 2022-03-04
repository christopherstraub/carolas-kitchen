import React, { useState } from 'react';
import { graphql, Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import useSiteMetadata from '../hooks/use-site-metadata';
import Layout from '../components/layout';
import Ingredients from '../components/ingredients';
import Preparation from '../components/preparation';
import NutritionFactsLabel from '../components/nutrition-facts-label';

const getServingsValue = (servings) => {
  /**
   * Regular expression capturing groups:
   * [0] A whole number or a hyphenated range of whole numbers.
   * [1] First value of the range if a range is supplied.
   * [2] Second value of the range if a range is supplied,
   * or the single value otherwise.
   */
  const servingsRegex = /^(?:(\d+)-)?(\d+)$/;

  // The second group is always the one we want.
  return Number(servings.match(servingsRegex)[2]);
};

export default function RecipePage({ data }) {
  const {
    title,
    slug,
    node_locale: nodeLocale,
    date,
    courseTags,
    heroImage,
    servings,
    ingredients,
    preparation,
    nutritionFacts,
    seasonTags,
  } = data.allContentfulRecipe.nodes[0];

  const dateString = new Date(date).toLocaleDateString(nodeLocale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const image = heroImage?.gatsbyImageData;

  const initialServingsValue = getServingsValue(servings);
  const [servingsValue, setServingsValue] = useState(initialServingsValue);

  return (
    <Layout>
      <header>
        <ul>
          {courseTags.map((tag) => (
            <li key={tag.slug}>
              <Link to={`/${tag.slug}`}>{tag.title}</Link>
            </li>
          ))}
        </ul>

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
        <Ingredients
          servings={servings}
          initialServingsValue={initialServingsValue}
          servingsValue={servingsValue}
          setServingsValue={setServingsValue}
          ingredientsHtml={ingredients.childMarkdownRemark.html}
        />
        <Preparation preparationHtml={preparation.childMarkdownRemark.html} />
      </main>
      {nutritionFacts && (
        <details>
          <summary>
            <h2>Nutrition Facts</h2>
          </summary>
          <NutritionFactsLabel
            nutrients={nutritionFacts.nutrients}
            initialServingsValue={initialServingsValue}
            servingsValue={servingsValue}
          />
        </details>
      )}
    </Layout>
  );
}

export const query = graphql`
  query RecipeQuery($id: String) {
    allContentfulRecipe(filter: { id: { eq: $id } }) {
      nodes {
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
        servings
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
`;
