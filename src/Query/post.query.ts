import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
  query POSTS_DATA {
    posts {
      id
      title
      content
      published
      createdAt
      author {
        id
        name
        email
      }
    }
  }
`;
