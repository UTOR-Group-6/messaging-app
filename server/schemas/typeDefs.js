const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
  }
  type Chat {
    _id: ID
    users: [User]!
    sender: User
    image: {
        fileName: String
        fileData: String
    }
    text: String
    createdat: Date
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
    addChat(sender: String, recipient: String, message: [String]!)
  }
`;

module.exports = typeDefs;
