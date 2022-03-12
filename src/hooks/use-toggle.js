import { useState } from 'react';

export default function useToggle(initialValue) {
  const [value, setValue] = useState(initialValue);

  function toggleValue(val) {
    setValue((prevValue) => (typeof val === 'boolean' ? val : !prevValue));
  }

  return [value, toggleValue];
}
