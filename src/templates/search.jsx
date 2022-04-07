import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { getLocalizedPathFromSlug } from '../i18n';
import useAppTranslations from '../hooks/use-static-query/use-app-translations';
import useToggle from '../hooks/use-toggle';
import useFilterTags from '../hooks/use-filter-tags';
import useRecipes from '../hooks/use-static-query/use-recipes';
import FilterModal from '../components/filter-modal';
import SearchIcon from '../icons/search-icon';
import FilterIcon from '../icons/filter-icon';

/**
 * Filtered recipes will contain every 'specialConsideration' and 'season'
 * tag selected, and any of the 'course' and 'ingredient' tags selected.
 */
function getFilteredRecipes(recipes, filterTags) {
  return recipes
    .filter((recipe) =>
      filterTags
        .filter(
          (tag) => tag.type === 'specialConsideration' || tag.type === 'season'
        )
        .map((tag) => tag.id)
        .every((id) => recipe.tags.map((tag) => tag.id).includes(id))
    )
    .filter((recipe) =>
      filterTags.filter((tag) => tag.type === 'course').length === 0
        ? true
        : filterTags
            .filter((tag) => tag.type === 'course')
            .map((tag) => tag.id)
            .some((id) => recipe.tags.map((tag) => tag.id).includes(id))
    )
    .filter((recipe) =>
      filterTags.filter((tag) => tag.type === 'ingredient').length === 0
        ? true
        : filterTags
            .filter((tag) => tag.type === 'ingredient')
            .map((tag) => tag.id)
            .some((id) => recipe.tags.map((tag) => tag.id).includes(id))
    );
}

export default function SearchPageTemplate({ pageContext }) {
  const { locale } = pageContext;

  const [showFilterModal, toggleShowFilterModal] = useToggle();
  const [filterTags, setFilterTags, addFilterTag, removeFilterTag] =
    useFilterTags();

  const recipes = useRecipes(locale);
  const filteredRecipes = useMemo(
    () => getFilteredRecipes(recipes, filterTags),
    [filterTags]
  );

  const {
    filter: tFilter,
    results: tResults,
    result: tResult,
    sortBy: tSortBy,
    newest: tNewest,
    alphabetical: tAlphabetical,
    noMatches: tNoMatches,
  } = useAppTranslations(locale).search;

  return (
    <>
      <input type="text" />
      <button type="button" id="search">
        <SearchIcon locale={locale} />
      </button>
      <button type="button" id="filter" onClick={toggleShowFilterModal}>
        <FilterIcon />
        {tFilter}
      </button>
      {showFilterModal && (
        <FilterModal
          toggleShowFilterModal={toggleShowFilterModal}
          filterTags={filterTags}
          setFilterTags={setFilterTags}
          addFilterTag={addFilterTag}
          removeFilterTag={removeFilterTag}
          locale={locale}
        />
      )}
      <div>
        <span>
          {filteredRecipes.length}{' '}
          {filteredRecipes.length === 1 ? tResult : tResults}
        </span>
        <div>
          <label htmlFor="sort-by">
            {tSortBy}:
            <select id="sort-by">
              <option value="newest">{tNewest}</option>
              <option value="alphabetical">{tAlphabetical}</option>
            </select>
          </label>
        </div>
      </div>
      {filteredRecipes.length ? (
        <ul>
          {filteredRecipes.map((recipe) => (
            <li key={recipe.id}>
              <Link to={getLocalizedPathFromSlug(recipe.slug, locale)}>
                {recipe.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>{tNoMatches}</p>
      )}
    </>
  );
}

SearchPageTemplate.propTypes = {
  pageContext: PropTypes.shape({
    locale: PropTypes.string.isRequired,
  }).isRequired,
};
