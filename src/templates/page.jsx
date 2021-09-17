import React from 'react';
import { graphql } from 'gatsby';

const PageTemplate = ({ data: { markdownRemark } }) => {
  const { html, frontmatter } = markdownRemark;
  const { title } = frontmatter;

  return (
    <div>
      This is a page
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />

    </div>
  );
};

export default PageTemplate;

export const query = graphql`
  query PageTemplate($id: String!) {
    markdownRemark(id: {eq: $id}) {
      frontmatter {
        title
      }
      html
    }
  }
`;
