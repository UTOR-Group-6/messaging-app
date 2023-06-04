const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
  }
  type Chat {
    _id: ID
    sender: String
    recipient: String
    message: {
        img: String
        text: String
    }
  }
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    me: User
    chatLogs: [Chat]!
    chatMsg(messageId): Chat

  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addChat(synder: String, recipient: String, message: [String]!)
  }
`;

module.exports = typeDefs;
