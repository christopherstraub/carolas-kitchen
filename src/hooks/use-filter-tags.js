import { useState } from 'react';

export default function useFilterTags() {
  const [filterTags, setFilterTags] = useState([]);

  /**
   * @param {{title: string, id: string, type: string}} filterTag
   */
  function addFilterTag(filterTag) {
    setFilterTags((prevFilterTags) => prevFilterTags.concat(filterTag));
  }

  /**
   * @param {id: string} id The id of the filter tag to remove.
   */
  function removeFilterTag(id) {
    setFilterTags((prevFilterTags) =>
      prevFilterTags.filter((tag) => tag.id !== id)
    );
  }

  return [filterTags, setFilterTags, addFilterTag, removeFilterTag];
}
