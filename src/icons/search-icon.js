import PropTypes from 'prop-types';
import useAppTranslations from '../hooks/use-static-query/use-app-translations';

export default function SearchIcon({ locale, title }) {
  const { title: tTitle } = useAppTranslations(locale).icons.search;

  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title ?? tTitle}</title>
      <circle cx="6" cy="6" r="5" fill="none" stroke="currentColor" />
      <line
        x1="10"
        y1="10"
        x2="15"
        y2="15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

SearchIcon.propTypes = {
  locale: PropTypes.string.isRequired,
  title: PropTypes.string,
};
SearchIcon.defaultProps = { title: null };
