import React from 'react';
import useAppTranslations from '../hooks/use-static-query/use-app-translations';

export default function Preparation({ preparationHtml, locale }) {
  const { title: tTitle } = useAppTranslations(locale).preparation;

  return (
    <section>
      <h2>{tTitle}</h2>
      <div
        dangerouslySetInnerHTML={{
          __html: preparationHtml,
        }}
      />
    </section>
  );
}
