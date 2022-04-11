import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { locales } from '../i18n';
import useSiteMetadata from '../hooks/use-static-query/use-site-metadata';

export default function SEO({
  locale,
  pathname,
  alternatePathname,
  title,
  description,
  image,
  article,
  publishDate,
}) {
  const {
    siteUrl,
    title: siteTitle,
    localeDescriptions: localeSiteDescriptions,
    author,
    image: siteImage,
  } = useSiteMetadata();

  const metaTitle = title ?? siteTitle;
  const metaDescription =
    description ?? localeSiteDescriptions[locale.replace('-', '_')];
  const metaImage = image ?? `${siteUrl}${siteImage}`;
  const type = article ? 'article' : 'website';
  const lang = locale.substring(0, 2);
  const url = `${siteUrl}${pathname}`;
  const alternateLang = locales.find((l) => l !== locale).substring(0, 2);
  const alternateUrl = `${siteUrl}${alternatePathname}`;

  return (
    <Helmet titleTemplate={`%s | ${siteTitle}`} defaultTitle={siteTitle}>
      <html
        lang={lang}
        prefix={`og: https://ogp.me/ns#${
          article ? ` article: https://ogp.me/ns/article#` : ''
        }`}
      />

      {title && <title>{title}</title>}

      <meta name="description" content={metaDescription} />
      {article && <meta name="author" content={author} />}

      <link rel="canonical" href={url} />
      {alternatePathname && [
        <link rel="alternate" hrefLang={lang} href={url} key={lang} />,
        <link
          rel="alternate"
          hrefLang={alternateLang}
          href={alternateUrl}
          key={alternateLang}
        />,
      ]}

      {/* The Open Graph protocol. https://ogp.me/ */}
      <meta property="og:title" content={metaTitle} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:image:alt" content={image ? metaTitle : siteTitle} />
      <meta property="og:type" content={type} />
      <meta property="og:description" content={metaDescription} />
      <meta property="site_name" content={siteTitle} />
      {/* Locales must be in the format language_TERRITORY. */}
      <meta property="og:locale" content={locale.replace('-', '_')} />
      {alternatePathname &&
        locales
          .filter((l) => l !== locale)
          .map((l) => (
            <meta
              key={l}
              property="og:locale:alternate"
              content={l.replace('-', '_')}
            />
          ))}
      {article && [
        <meta
          property="article:published_time"
          content={publishDate}
          key={publishDate}
        />,
        <meta property="article:author" content={author} key={author} />,
      ]}

      {/*
      If the Twitter card processor does not find a Twitter-specific property,
      it will fall back to the supported Open Graph property.
      https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup
      */}
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
}

SEO.propTypes = {
  locale: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  alternatePathname: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  article: PropTypes.bool,
  publishDate: PropTypes.string,
};
SEO.defaultProps = {
  alternatePathname: null,
  title: null,
  description: null,
  image: null,
  article: false,
  publishDate: null,
};
