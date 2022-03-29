const path = require('path');
const {
  localePathPrefixes,
  getLocalizedPath,
  getLocalizedPathFromSlug,
} = require('./src/i18n');

const locales = Object.keys(localePathPrefixes);

exports.createPages = async ({ actions, graphql }) => {
  const { createRedirect, createPage } = actions;
  createRedirect({
    fromPath: 'https://carolaskitchen.netlify.app/*',
    isPermanent: false,
    toPath: 'https://www.carolaskitchen.com/:splat',
    force: true,
  });

  /**
   *
   * @param {Object.<string, string>} localePaths Object with locale keys and
   * unprefixed path values.
   * @param {string} template
   */
  function createLocalizedPagesFromPaths(localePaths, template) {
    locales.forEach((locale) => {
      const otherLocale = locales.find((l) => l !== locale);
      createPage({
        path: getLocalizedPath(localePaths[locale], locale),
        component: template,
        context: {
          locale,
          otherLocalePath: getLocalizedPath(
            localePaths[otherLocale],
            otherLocale
          ),
        },
      });
    });
  }

  const indexPagePaths = Object.fromEntries(
    locales.map((locale) => [locale, '/'])
  );
  const indexPageTemplate = path.resolve('src/templates/index.jsx');
  createLocalizedPagesFromPaths(indexPagePaths, indexPageTemplate);

  const {
    data: { allContentfulTranslations },
  } = await graphql(`
    query SearchSlugs {
      allContentfulTranslations(filter: { for: { eq: "Application" } }) {
        nodes {
          node_locale
          translations {
            search {
              slug
            }
          }
        }
      }
    }
  `);
  const searchPagePaths = Object.fromEntries(
    locales.map((locale) => [
      locale,
      `/${
        allContentfulTranslations.nodes.find(
          (node) => node.node_locale === locale
        ).translations.search.slug
      }/`,
    ])
  );
  const searchPageTemplate = path.resolve('src/templates/search.jsx');
  createLocalizedPagesFromPaths(searchPagePaths, searchPageTemplate);

  /**
   *
   * @param {Object[]} nodes
   * @param {string} nodes[].slug
   * @param {string} nodes[].node_locale
   * @param {string} nodes[].id
   * @param {string} nodes[].contentful_id
   * @param {string} template
   */
  function createLocalizedPagesFromNodes(nodes, template) {
    nodes.forEach((node) => {
      const {
        slug,
        node_locale: locale,
        id,
        contentful_id: contentfulId,
      } = node;
      const { node_locale: otherLocale, slug: otherLocaleSlug } = nodes.find(
        (n) => n.node_locale !== locale && n.contentful_id === contentfulId
      );

      createPage({
        path: getLocalizedPathFromSlug(slug, locale),
        component: template,
        context: {
          id,
          otherLocalePath: getLocalizedPathFromSlug(
            otherLocaleSlug,
            otherLocale
          ),
        },
      });
    });
  }

  const {
    data: { allContentfulRecipe },
  } = await graphql(`
    query Recipes {
      allContentfulRecipe {
        nodes {
          slug
          node_locale
          id
          contentful_id
        }
      }
    }
  `);
  const recipePageTemplate = path.resolve('src/templates/recipe.jsx');
  createLocalizedPagesFromNodes(allContentfulRecipe.nodes, recipePageTemplate);

  const {
    data: { allContentfulRecipeCourseTags },
  } = await graphql(`
    query RecipeCourseTags {
      allContentfulRecipeCourseTags {
        nodes {
          slug
          node_locale
          id
          contentful_id
        }
      }
    }
  `);
  const recipeCoursePageTemplate = path.resolve(
    'src/templates/recipe-course.jsx'
  );
  createLocalizedPagesFromNodes(
    allContentfulRecipeCourseTags.nodes,
    recipeCoursePageTemplate
  );
};

/**
 * We override the ingredientTags field type (`[String]` by default) with a new
 * type IngredientTags. We provide a custom resolver to this field in the
 * createResolvers API (implemented below). Alternatively, we could have both
 * defined the type and provided the resolver in the createSchemaCustomization
 * API using Gatsby Type Builders.
 */
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
  type ContentfulRecipe implements Node {
    ingredientTags: [IngredientTag]
  }
  type IngredientTag {
    node_locale: String!
    title: String!
    id: String!
    type: String!
  }
  `;
  createTypes(typeDefs);
};

exports.createResolvers = ({ createResolvers }) => {
  function capitalize(string) {
    return `${string[0].toUpperCase()}${string.slice(1)}`;
  }

  const resolvers = {
    /**
     * To each `contentfulRecipeIngredientsTextNode` object type
     * (ingredients field), we'd like to add the 'scaleWhitelists'
     * corresponding to the parent (a recipe) node_locale.
     */
    contentfulRecipeIngredientsTextNode: {
      scaleWhitelists: {
        type: `[ContentfulRecipeIngredientsScaleWhitelist]`,
        resolve: async (source, args, context) => {
          const parentNodeLocale = context.nodeModel.getNodeById({
            id: source.parent,
            type: `ContentfulRecipe`,
          }).node_locale;

          const { entries } = await context.nodeModel.findAll({
            type: `ContentfulRecipeIngredientsScaleWhitelist`,
            query: {
              filter: {
                node_locale: {
                  eq: parentNodeLocale,
                },
              },
            },
          });
          return entries;
        },
      },
    },

    /**
     * Add a type field to each of the tag object types to assist in
     * differentiating between them in the application.
     */
    ContentfulRecipeCourseTags: {
      type: {
        type: `String!`,
        resolve: () => 'course',
      },
    },
    ContentfulRecipeSpecialConsiderationTags: {
      type: {
        type: `String!`,
        resolve: () => 'specialConsideration',
      },
    },
    ContentfulRecipeSeasonTags: {
      type: {
        type: `String!`,
        resolve: () => 'season',
      },
    },

    /**
     * With the previous three tag types we wanted to add a new field
     * which can be accomplished with just the createResolvers API.
     * However we want to override the ingredientTags field type which requires
     * we define the new type with the createTypes action only available in the
     * createSchemaCustomization API (implemented above).
     */
    ContentfulRecipe: {
      ingredientTags: {
        resolve: (source) =>
          source.ingredientTags?.map((tag) => ({
            node_locale: source.node_locale,
            title: capitalize(tag),
            id: tag,
            type: `ingredient`,
          })),
      },
    },

    Query: {
      allContentfulRecipeIngredientTags: {
        type: `[IngredientTag]`,
        args: { node_locale: `String` },
        resolve: async (source, args, context) => {
          const { node_locale: nodeLocale } = args;

          if (nodeLocale !== undefined) {
            const { entries } = await context.nodeModel.findAll({
              type: `ContentfulRecipe`,
              query: {
                filter: {
                  node_locale: { eq: nodeLocale },
                },
              },
            });

            const recipes = [...entries];
            const ingredientTags = recipes.flatMap(
              (recipe) => recipe.ingredientTags ?? []
            );
            const uniqueIngredientTags = [...new Set(ingredientTags)];

            return uniqueIngredientTags.map((tag) => ({
              node_locale: nodeLocale,
              title: capitalize(tag),
              id: tag,
              type: 'ingredient',
            }));
          }

          const { entries } = await context.nodeModel.findAll({
            type: `ContentfulRecipe`,
          });

          return locales.flatMap((locale) => {
            const ingredientTags = [...entries]
              .filter((recipe) => recipe.node_locale === locale)
              .flatMap((recipe) => recipe.ingredientTags ?? []);
            const uniqueIngredientTags = [...new Set(ingredientTags)];
            return uniqueIngredientTags.map((tag) => ({
              node_locale: locale,
              title: capitalize(tag),
              id: tag,
              type: 'ingredient',
            }));
          });
        },
      },
    },
  };
  createResolvers(resolvers);
};
