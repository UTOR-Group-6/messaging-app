import { gql } from '@apollo/client';

export const LOGIN_USER = gql `
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
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

export const CREATE_CHAT = gql `
  mutation createChat {
    createChat {
      _id
    }
  }
`;

export const CREATE_MESSAGE = gql `
  mutation createMessage($chatId: ID!, $messageText: String!) {
    createMessage(chatId: $chatId, messageText: $messageText) {
      _id
      messageText
      chat {
        _id
      }
    }
  }
`

// create chats/delete chats? 