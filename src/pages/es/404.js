import SEO from '../../components/seo';

export default function NotFoundPage() {
  return (
    <>
      <SEO locale="es" title="Página No Encontrada" />
      <h1>404</h1>
      <p>Disculpa, la página que busca no existe.</p>
    </>
  );
}
