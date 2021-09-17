import React from 'react';
import { graphql } from 'gatsby';

const RecipeTemplate = ({ data: { markdownRemark } }) => {
  const { html, frontmatter } = markdownRemark;
  const { title } = frontmatter;

  return (
    <div>
      This is a recipe
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};

export default RecipeTemplate;

export const query = graphql`
  query RecipeTemplate($id: String!) {
    markdownRemark(id: {eq: $id}) {
      frontmatter {
        title
      }
      html
    }
  }
`;
