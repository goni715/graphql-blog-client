import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation RegisterData($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      userError
      name
      email
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      userError
      token
    }
  }
`;
