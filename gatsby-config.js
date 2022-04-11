require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    siteUrl: 'https://carolastable.com',
    title: "Carola's Table",
    localeDescriptions: {
      'en-US': `Recipes with simple and natural ingredients! We hope you'll enjoy cooking delicious, fresh and seasonal dishes with us.`,
      'es': '¡Recetas con ingredientes simples y naturales! Nosotros deseamos que disfrutes al cocinar platos deliciosos, frescos y de estación.',
    },
    author: 'Carola',
    image: '/default-og-image.png',
  },
  // In Gatsby v5 the default mode will be 'always'.
  trailingSlash: 'always',
  jsxRuntime: 'automatic',
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-transformer-remark',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-netlify',
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        host: process.env.CONTENTFUL_HOST,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/favicon.png',
        name: "Carola's Table",
        short_name: "Carola's Table",
        start_url: '/',
        background_color: 'white',
        theme_color: 'white',
        display: 'standalone',
      },
    },
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: [process.env.GOOGLE_ANALYTICS_TRACKING_ID],
        pluginConfig: {
          head: true,
        },
      },
    },
  ],
};
