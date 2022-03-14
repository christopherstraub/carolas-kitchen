import React from 'react';
import useRecipeTags from '../hooks/use-static-query/use-recipe-tags';
import FilterTagGroup from './filter-tag-group';
import CloseIcon from '../icons/close-icon';

export default function FilterModal({
  nodeLocale,
  toggleShowFilterModal,
  filterTags,
  setFilterTags,
  addFilterTag,
  removeFilterTag,
}) {
  const recipeTags = useRecipeTags()[nodeLocale];

  return (
    <div>
      <header>
        <h2>filter by:</h2>
        <button type="button" onClick={toggleShowFilterModal}>
          <CloseIcon />
        </button>
      </header>
      <ul>
        {filterTags.map((filter) => (
          <li key={filter.id}>
            <span> {filter.title}</span>
            <button type="button" onClick={() => removeFilterTag(filter.id)}>
              <CloseIcon />
            </button>
          </li>
        ))}
      </ul>
      {filterTags.length >= 1 && (
        <button type="button" onClick={() => setFilterTags([])}>
          clear all
        </button>
      )}
      {recipeTags.map((tag) => (
        <FilterTagGroup
          key={tag.title}
          title={tag.title}
          options={tag.options}
          filterTags={filterTags}
          addFilterTag={addFilterTag}
          removeFilterTag={removeFilterTag}
        />
      ))}
    </div>
  );
}
