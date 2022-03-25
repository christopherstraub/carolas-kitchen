function capitalize(string) {
  return `${string[0].toUpperCase()}${string.slice(1)}`;
}

exports.createPages = ({ actions: { createRedirect } }) => {
  createRedirect({
    fromPath: 'https://carolaskitchen.netlify.app/*',
    isPermanent: false,
    toPath: 'https://www.carolaskitchen.com/:splat',
    force: true,
  });
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
    title: String!
    id: String!
    type: String!
  }
  `;
  createTypes(typeDefs);
};

exports.createResolvers = ({ createResolvers }) => {
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
          const { node_locale: nodeLocale = 'en-US' } = args;

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
            title: capitalize(tag),
            id: tag,
            type: 'ingredient',
          }));
        },
      },
    },
  };
  createResolvers(resolvers);
};
