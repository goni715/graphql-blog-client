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

export const PUBLISH_POST = gql`
  mutation PublishPost($postId: ID!) {
    publishPost(postId: $postId) {
      userError
      post {
        id
        title
        content
        published
      }
    }
  }
`;
