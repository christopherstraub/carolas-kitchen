const localePathPrefixes = {
  'en-US': '',
  'es': '/es',
};
const locales = Object.keys(localePathPrefixes);

function getLocaleFromPath(path) {
  return path.startsWith(`${localePathPrefixes['es']}/`) ? 'es' : 'en-US';
}

function getLocalizedPath(path, locale) {
  return `${localePathPrefixes[locale]}${path}`;
}
function getLocalizedPathFromSlug(slug, locale) {
  const path = `/${slug}/`;
  return `${localePathPrefixes[locale]}${path}`;
}

module.exports = {
  locales,
  getLocaleFromPath,
  getLocalizedPath,
  getLocalizedPathFromSlug,
};
