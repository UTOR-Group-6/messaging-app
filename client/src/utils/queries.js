import { gql } from "@apollo/client";

export const QUERY_CHAT = gql`
  query getChat {
    chat {
      _id
      sender
      recipient
      createdAt
      message
    }
  }
`;

export const QUERY_CHATS = gql`
  query getChatlog {
    chats {
      _id
      sender
      recipient
      createdAt
      message
    }
  }
`;
