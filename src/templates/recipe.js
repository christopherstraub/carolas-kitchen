import { useState } from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { getLocalizedPathFromSlug } from '../i18n';
import useAppTranslations from '../hooks/use-static-query/use-app-translations';
import useSiteMetadata from '../hooks/use-static-query/use-site-metadata';
import SEO from '../components/seo';
import Ingredients from '../components/ingredients';
import Preparation from '../components/preparation';
import NutritionFactsLabel from '../components/nutrition-facts-label';

const getServingsValue = (servings) => {
  /**
   * Regular expression capturing groups:
   * [0] A whole number or a range of whole numbers.
   * [1] First value of the range if a range is supplied.
   * [2] Second value of the range if a range is supplied or the single value
   * otherwise.
   */
  const servingsRegex = /^(?:(\d+)(?:–|-))?(\d+)$/;

  // The second group is always the one we want.
  return Number(servings.match(servingsRegex)[2]);
};

export default function RecipeTemplate({
  data: { recipe },
  location: { pathname },
  pageContext: { otherLocalePath },
}) {
  const {
    title,
    node_locale: locale,
    publishDate,
    courseTags,
    heroImage,
    servings,
    yieldAmount,
    ingredients,
    preparation,
    nutritionFacts,
  } = recipe;

  const dateString = new Date(publishDate).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const image = heroImage?.gatsbyImageData;

  const initialServingsValue = getServingsValue(servings);
  const [servingsValue, setServingsValue] = useState(initialServingsValue);

  const { title: tNutritionFactsTitle } =
    useAppTranslations(locale).nutritionFacts;

  return (
    <>
      <SEO
        locale={locale}
        alternatePathname={otherLocalePath}
        title={title}
        image={heroImage?.url}
        article
        publishDate={publishDate}
      />
      <article>
        <header>
          <ul>
            {courseTags.map((tag) => (
              <li key={tag.slug}>
                <Link to={getLocalizedPathFromSlug(tag.slug, locale)}>
                  {tag.title}
                </Link>
              </li>
            ))}
          </ul>

          <h1>{title}</h1>
          <time dateTime={publishDate}>{dateString}</time>
          {image && <GatsbyImage image={image} alt={title} />}
        </header>
        <ul>
          <li>
            <a
              href={`mailto:?subject=${title}&body=${
                useSiteMetadata().siteUrl
              }${pathname}`}
            >
              email
            </a>
          </li>
          <li>
            <a href="#">pinterest</a>
          </li>
        </ul>
        <Ingredients
          ingredientsHtml={ingredients.childMarkdownRemark.html}
          scaleWhitelists={ingredients.scaleWhitelists}
          servings={servings}
          yieldAmount={yieldAmount}
          initialServingsValue={initialServingsValue}
          servingsValue={servingsValue}
          setServingsValue={setServingsValue}
          locale={locale}
        />
        <Preparation
          preparationHtml={preparation.childMarkdownRemark.html}
          locale={locale}
        />
        {nutritionFacts && (
          <details>
            <summary>
              <h2>{tNutritionFactsTitle}</h2>
            </summary>
            <NutritionFactsLabel
              nutrients={nutritionFacts.nutrients}
              initialServingsValue={initialServingsValue}
              servingsValue={servingsValue}
              locale={locale}
            />
          </details>
        )}
      </article>
    </>
  );
}

export const query = graphql`
  query Recipe($id: String!) {
    recipe: contentfulRecipe(id: { eq: $id }) {
      title
      node_locale
      publishDate
      courseTags {
        title
        slug
      }
      heroImage {
        gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
        url
      }
      servings
      yieldAmount
      ingredients {
        childMarkdownRemark {
          html
        }
        scaleWhitelists {
          key
          whitelist
        }
      }
      preparation {
        childMarkdownRemark {
          html
        }
      }
      nutritionFacts {
        nutrients {
          id
          amount
        }
      }
    }
  }
`;

RecipeTemplate.propTypes = {
  data: PropTypes.shape({
    recipe: PropTypes.shape({
      title: PropTypes.string.isRequired,
      node_locale: PropTypes.string.isRequired,
      publishDate: PropTypes.string.isRequired,
      courseTags: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          slug: PropTypes.string.isRequired,
        })
      ),
      heroImage: PropTypes.shape({
        // eslint-disable-next-line react/forbid-prop-types
        gatsbyImageData: PropTypes.object,
        url: PropTypes.string,
      }),
      servings: PropTypes.string.isRequired,
      yieldAmount: PropTypes.string,
      ingredients: PropTypes.shape({
        childMarkdownRemark: PropTypes.shape({
          html: PropTypes.string,
        }),
        scaleWhitelists: PropTypes.arrayOf(
          PropTypes.shape({
            key: PropTypes.string.isRequired,
            whitelist: PropTypes.arrayOf(PropTypes.string),
          })
        ).isRequired,
      }),
      preparation: PropTypes.shape({
        childMarkdownRemark: PropTypes.shape({
          html: PropTypes.string,
        }),
      }),
      nutritionFacts: PropTypes.shape({
        nutrients: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.number.isRequired,
            amount: PropTypes.number.isRequired,
          })
        ),
      }),
    }),
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  pageContext: PropTypes.shape({
    otherLocalePath: PropTypes.string.isRequired,
  }).isRequired,
};
