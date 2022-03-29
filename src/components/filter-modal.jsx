import React from 'react';
import useAppTranslations from '../hooks/use-static-query/use-app-translations';
import useRecipeTags from '../hooks/use-static-query/use-recipe-tags';
import FilterTagGroup from './filter-tag-group';
import CloseIcon from '../icons/close-icon';

export default function FilterModal({
  toggleShowFilterModal,
  filterTags,
  setFilterTags,
  addFilterTag,
  removeFilterTag,
  locale,
}) {
  const tags = useRecipeTags(locale);

  const {
    filterModal: { filterBy: tFilterBy, clearAll: tClearAll },
    icons: {
      close: { removeFilter: tRemoveFilter },
    },
  } = useAppTranslations(locale);

  return (
    <div>
      <header>
        <h2>{tFilterBy}:</h2>
        <button type="button" onClick={toggleShowFilterModal}>
          <CloseIcon locale={locale} />
        </button>
      </header>
      <ul>
        {filterTags.map((filter) => (
          <li key={filter.id}>
            <span> {filter.title}</span>
            <button type="button" onClick={() => removeFilterTag(filter.id)}>
              <CloseIcon locale={locale} title={tRemoveFilter} />
            </button>
          </li>
        ))}
      </ul>
      {filterTags.length >= 1 && (
        <button type="button" onClick={() => setFilterTags([])}>
          {tClearAll}
        </button>
      )}
      <FilterTagGroup
        title={tags.course.title}
        options={tags.course.options}
        filterTags={filterTags}
        addFilterTag={addFilterTag}
        removeFilterTag={removeFilterTag}
      />
      <FilterTagGroup
        title={tags.specialConsideration.title}
        options={tags.specialConsideration.options}
        filterTags={filterTags}
        addFilterTag={addFilterTag}
        removeFilterTag={removeFilterTag}
      />
      <FilterTagGroup
        title={tags.season.title}
        options={tags.season.options}
        filterTags={filterTags}
        addFilterTag={addFilterTag}
        removeFilterTag={removeFilterTag}
      />
      <FilterTagGroup
        title={tags.ingredient.title}
        options={tags.ingredient.options}
        filterTags={filterTags}
        addFilterTag={addFilterTag}
        removeFilterTag={removeFilterTag}
      />
    </div>
  );
}
