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

export const GET_MY_POSTS = gql`
  query GET_MY_POSTS {
    me {
      userError
      user {
        id
        name
        email
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
    }
  }
`;
