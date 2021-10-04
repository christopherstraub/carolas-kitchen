exports.createPages = ({ actions: { createRedirect } }) => {
  createRedirect({
    fromPath: 'https://carolaskitchen.netlify.app/*',
    isPermanent: false,
    toPath: 'https://www.carolaskitchen.com/:splat',
    force: true,
  });
};
