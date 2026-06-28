import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation CreatePost($post: PostInput!) {
    addPost(post: $post) {
      userError
      post {
        title
        content
        published
      }
    }
  }
`;
