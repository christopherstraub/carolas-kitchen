require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    siteUrl: 'https://carolaskitchen.com/',
    title: "Carola's Kitchen",
  },
  // In Gatsby v5 the default mode will be 'always'.
  trailingSlash: 'always',
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-transformer-remark',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
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
        name: "Carola's Kitchen",
        short_name: "Carola's Kitchen",
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
