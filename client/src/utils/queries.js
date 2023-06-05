import { gql } from "@apollo/client";

export const QUERY_CHATS = gql`
  query chatLog {
    chats {
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
`;

export const QUERY_MESSAGE = gql`
  query getMessage($messageId: ID!) {
    chat(messageID: $messageID) {
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
`;
