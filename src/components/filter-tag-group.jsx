import React from 'react';
import PropTypes from 'prop-types';

export default function FilterTagGroup({
  title,
  tags,
  filterTags,
  addFilterTag,
  removeFilterTag,
}) {
  return (
    <details>
      <summary>{title}</summary>
      <ul>
        {tags.map((tag) => (
          <li key={tag.id}>
            <label htmlFor={tag.id}>{tag.title}</label>
            <input
              type="checkbox"
              id={tag.id}
              checked={filterTags.some(({ id }) => id === tag.id)}
              onChange={(event) =>
                event.target.checked
                  ? addFilterTag({
                      title: tag.title,
                      id: tag.id,
                      type: tag.type,
                    })
                  : removeFilterTag(tag.id)
              }
            />
          </li>
        ))}
      </ul>
    </details>
  );
}

FilterTagGroup.propTypes = {
  title: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    })
  ).isRequired,
  filterTags: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    })
  ).isRequired,
  addFilterTag: PropTypes.func.isRequired,
  removeFilterTag: PropTypes.func.isRequired,
};
