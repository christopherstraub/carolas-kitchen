import PropTypes from 'prop-types';
import useAppTranslations from '../hooks/use-static-query/use-app-translations';

export default function Preparation({ html, locale }) {
  const { title: tTitle } = useAppTranslations(locale).preparation;

  return (
    <section>
      <h2>{tTitle}</h2>
      <div
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    </section>
  );
}

Preparation.propTypes = {
  html: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
};
