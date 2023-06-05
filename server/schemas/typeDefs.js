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
    chats: [Chat]!
    chat(messageId: ID!): Chat
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addChat(sender: User!, recipient: User!, fileName: String!, fileData: String!, text: String!): Chat
  }
`;

module.exports = typeDefs;
