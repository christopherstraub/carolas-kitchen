import { useStaticQuery, graphql } from 'gatsby';

export default function useSiteMetadata() {
  const {
    site: { siteMetadata },
  } = useStaticQuery(
    graphql`
      query SiteMetadata {
        site {
          siteMetadata {
            siteUrl
            title
            localeDescriptions {
              en_US
              es
            }
            author
            image
          }
        }
      }
    `
  );

  return siteMetadata;
}
