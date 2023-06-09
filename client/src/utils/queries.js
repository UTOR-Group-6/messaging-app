import { gql } from "@apollo/client";

export const QUERY_FIND_USER = gql`
  query findUser($username: String!) {
    findUser(username: $username) {
      _id
      username
      email
      icon
    }
  }
`;

export const QUERY_CHAT = gql`
  query getChat($_id: ID) {
    chat(_id: $_id) {
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
      }
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      _id
      username
      email
      bio
      icon
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

/* 
Queries:
- Get all chats of a user (maybe need to define chats in User Schema?) - context.user
- Get one chat by id (populate messages and users)
- Get user who is signed in (GET ME)- context.user - done
- Get user by username - NOT context user (to look up people to add to chat)

Mutations:
- login - done
- signup - done
- create chat - by entering another user's username
- create message - by entering message text
- update users icon
- update users username, email, and bio

only of there is time:
- delete message
- delete chat
- update message
- update chat

*/
