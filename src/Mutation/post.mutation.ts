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

export const DELETE_POST = gql`
  mutation DeletePost($postId: ID!) {
    deletePost(postId: $postId) {
      userError
      post {
        id
        title
        content
      }
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($postId: ID!, $post: PostInput) {
    updatePost(postId: $postId, post: $post) {
      userError
      post {
        title
        content
      }
    }
  }
`;
