/* eslint-disable import/prefer-default-export */
import Layout from './src/components/layout';
import './src/sass/main.scss';

export function wrapPageElement({ element, props }) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Layout {...props}>{element}</Layout>;
}
