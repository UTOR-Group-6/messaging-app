import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_CHAT = gql`
  mutation addChat($sender: User!, $recipient: User!, $fileName: String!, $fileData: String!, $text: String! {
    addChat(sender: $sender, recipient: $recipient, fileName: $fileName, fileData: $fileData, text: $text) {
      chat {
        _id
        users
        sender
        image {
          fileName
          fileData
        }
        text
        createdAt
      }
    }
  }
`;
