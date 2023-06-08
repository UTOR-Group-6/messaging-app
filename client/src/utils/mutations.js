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
      }
    }
  }
`;

export const CREATE_CHAT = gql`
  mutation createChat($users: [ID]) {
    createChat(users: $users) {
      _id
      users {
        _id
        username
      }
      createdAt
    }
  }
`;

export const UPDATE_CHAT = gql`
  mutation updateChat($_id: ID, $messageText: String, $user: String) {
    updateChat(_id: $_id, messageText: $messageText, user: $user) {
      _id
      messages {
        _id
        messageText
        createdAt
      }
    }
  }
`;

export const UPDATE_USER_CHATS = gql`
  mutation updateUserChats($_id: ID, $chatId: ID) {
    updateUserChats(_id: $_id, chatId: $chatId) {
      _id
      username
      chats {
        _id
        messages {
          _id
          messageText
          user
          createdAt
        }
        users {
          _id
          username
          email
        }
      }
    }
  }
`;

export const UPDATE_USER_INFO = gql`
  mutation updateUserInfo(
    $username: String!
    $email: String!
    $bio: String!
    $icon: String!
  ) {
    updateUserInfo(username: $username, email: $email, bio: $bio, icon: $icon) {
      _id
      username
      email
      bio
      icon
    }
  }
`;
