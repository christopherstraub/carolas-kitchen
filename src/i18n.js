const localePathPrefixes = {
  'en-US': '',
  'es': '/es',
};
const locales = Object.keys(localePathPrefixes);
const localeLanguages = {
  'en-US': 'English',
  'es': 'Español',
};

function validateLocale(locale) {
  if (!locales.includes(locale))
    throw new Error(`Invalid locale \`${locale}\``);
}

/**
 * @param {('en-US|'es')} firstLocale First locale in returned array of locales.
 * @returns Locales.
 */
function getLocales(firstLocale = locales[0]) {
  validateLocale(firstLocale);
  return [firstLocale].concat(locales.filter((l) => l !== firstLocale));
}

function getLocaleLanguage(locale) {
  validateLocale(locale);
  return localeLanguages[locale];
}

function getLocaleFromPath(path) {
  return path.startsWith(`${localePathPrefixes['es']}/`) ? 'es' : 'en-US';
}

function getLocalizedPath(path, locale) {
  validateLocale(locale);
  return `${localePathPrefixes[locale]}${path}`;
}
function getLocalizedPathFromSlug(slug, locale) {
  validateLocale(locale);
  const path = `/${slug}/`;
  return `${localePathPrefixes[locale]}${path}`;
}

module.exports = {
  getLocales,
  getLocaleLanguage,
  getLocaleFromPath,
  getLocalizedPath,
  getLocalizedPathFromSlug,
};
