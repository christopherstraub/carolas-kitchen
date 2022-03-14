import React, { useMemo } from 'react';
import { Link } from 'gatsby';
import useToggle from '../hooks/use-toggle';
import useFilterTags from '../hooks/use-filter-tags';
import useRecipes from '../hooks/use-static-query/use-recipes';
import FilterModal from '../components/filter-modal';
import SearchIcon from '../icons/search-icon';
import FilterIcon from '../icons/filter-icon';

/**
 * Filtered recipes should contain every 'specialConsideration' and 'season'
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

export default function SearchPage() {
  const [showFilterModal, toggleShowFilterModal] = useToggle(true);
  const [filterTags, setFilterTags, addFilterTag, removeFilterTag] =
    useFilterTags();

  const recipes = useRecipes()['en-US'];

  const filteredRecipes = useMemo(
    () => getFilteredRecipes(recipes, filterTags),
    [filterTags]
  );

  return (
    <main>
      <input type="text" />
      <button type="button" id="search">
        <SearchIcon />
      </button>
      <button type="button" id="filter" onClick={toggleShowFilterModal}>
        <FilterIcon />
        FILTER
      </button>
      <div>
        <span>{filteredRecipes.length} results</span>
        <div>
          <label htmlFor="sort-by">
            Sort by:
            <select id="sort-by">
              <option value="newest">Newest</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </label>
        </div>
      </div>
      <ul>
        {filteredRecipes.map((recipe) => (
          <li key={recipe.id}>
            <Link to={`/${recipe.slug}`}>{recipe.title}</Link>
          </li>
        ))}
      </ul>
      {showFilterModal && (
        <FilterModal
          nodeLocale="en-US"
          toggleShowFilterModal={toggleShowFilterModal}
          filterTags={filterTags}
          setFilterTags={setFilterTags}
          addFilterTag={addFilterTag}
          removeFilterTag={removeFilterTag}
        />
      )}
    </main>
  );
}
