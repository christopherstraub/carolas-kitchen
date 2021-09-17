const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
  const result = await graphql(`
    query CreatePages {
      recipes: allFile(filter: {sourceInstanceName: {eq: "recipes"}}) {
        nodes {
          childMarkdownRemark {
            fields {
              slug
            }
            id
          }
        }
      }
      pages: allFile(filter: {sourceInstanceName: {eq: "pages"}}) {
        nodes {
          childMarkdownRemark {
            fields {
              slug
            }
            id
          }
        }
      }
    }
  `);

  const recipes = result.data.recipes.nodes;
  const pages = result.data.pages.nodes;

  recipes.forEach(({ childMarkdownRemark }) => {
    const { id, fields } = childMarkdownRemark;
    const { slug } = fields;

    actions.createPage({
      path: slug,
      component: path.resolve('./src/templates/recipe.jsx'),
      context: { id },
    });
  });
  pages.forEach(({ childMarkdownRemark }) => {
    const { id, fields } = childMarkdownRemark;
    const { slug } = fields;

    actions.createPage({
      path: slug,
      component: path.resolve('./src/templates/page.jsx'),
      context: { id },
    });
  });
};
