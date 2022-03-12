import React from 'react';

export default function Preparation({ preparationHtml }) {
  return (
    <section>
      <h2>Preparation</h2>
      <div
        dangerouslySetInnerHTML={{
          __html: preparationHtml,
        }}
      />
    </section>
  );
}
