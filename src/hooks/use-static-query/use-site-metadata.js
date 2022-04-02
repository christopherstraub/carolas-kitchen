import { useStaticQuery, graphql } from 'gatsby';

export default function useSiteMetadata() {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetadata {
        site {
          siteMetadata {
            title
            siteUrl
          }
        }
      }
    `
  );

  return site.siteMetadata;
}
