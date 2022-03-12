import React from 'react';

export default function FilterTagGroup({
  title,
  options,
  filterTags,
  addFilterTag,
  removeFilterTag,
}) {
  return (
    <details>
      <summary>{title}</summary>
      <ul>
        {options.map((tag) => (
          <li key={tag.id}>
            <label htmlFor={tag.id}>{tag.title}</label>
            <input
              type="checkbox"
              id={tag.id}
              checked={filterTags.some((filter) => filter.id === tag.id)}
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
