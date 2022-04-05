import React from 'react';
import PropTypes from 'prop-types';
import useAppTranslations from '../hooks/use-static-query/use-app-translations';

export default function Preparation({ preparationHtml, locale }) {
  const { title: tTitle } = useAppTranslations(locale).preparation;

  return (
    <section>
      <h2>{tTitle}</h2>
      <div
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: preparationHtml,
        }}
      />
    </section>
  );
}

Preparation.propTypes = {
  preparationHtml: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
};
