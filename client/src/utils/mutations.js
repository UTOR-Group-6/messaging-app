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
  mutation addChat($sender: User!, $recipient: User!, {
    addChat(sender: $sender, recipient: $recipient, message: {img: $message.img, text: $message.text}) {
      chat {
        _id
        users
        sender
        image
        text
        createdAt
      }
    }
  }
`;
