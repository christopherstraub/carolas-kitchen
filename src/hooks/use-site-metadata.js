import { useStaticQuery, graphql } from 'gatsby';

export default function useSiteMetadata() {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteUrl
          }
        }
      }
    `
  );

  return site.siteMetadata;
}
