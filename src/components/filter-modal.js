import PropTypes from 'prop-types';
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
  const recipeTags = useRecipeTags(locale);

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
        title={recipeTags.course.title}
        tags={recipeTags.course.tags}
        filterTags={filterTags}
        addFilterTag={addFilterTag}
        removeFilterTag={removeFilterTag}
      />
      <FilterTagGroup
        title={recipeTags.specialConsideration.title}
        tags={recipeTags.specialConsideration.tags}
        filterTags={filterTags}
        addFilterTag={addFilterTag}
        removeFilterTag={removeFilterTag}
      />
      <FilterTagGroup
        title={recipeTags.season.title}
        tags={recipeTags.season.tags}
        filterTags={filterTags}
        addFilterTag={addFilterTag}
        removeFilterTag={removeFilterTag}
      />
      <FilterTagGroup
        title={recipeTags.ingredient.title}
        tags={recipeTags.ingredient.tags}
        filterTags={filterTags}
        addFilterTag={addFilterTag}
        removeFilterTag={removeFilterTag}
      />
    </div>
  );
}

FilterModal.propTypes = {
  toggleShowFilterModal: PropTypes.func.isRequired,
  filterTags: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    })
  ).isRequired,
  setFilterTags: PropTypes.func.isRequired,
  addFilterTag: PropTypes.func.isRequired,
  removeFilterTag: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
};
