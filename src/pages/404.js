import SEO from '../components/seo';

export default function NotFoundPage() {
  return (
    <>
      <SEO locale="en-US" title="Page Not Found" />
      <h1>404</h1>
      <p>{`Sorry, the page you're looking for doesn't exist.`}</p>
    </>
  );
}
