import { gql } from "@apollo/client";

export const QUERY_CHAT = gql`
  query getMessage {
    chat {
      users
      message
      createdAt
    }
  }
`;

export const QUERY_CHATS = gql`
  query getChatlog {
    chats {
      users
      message
      createdAt
    }
  }
`;
