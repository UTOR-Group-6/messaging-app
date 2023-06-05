const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type Message {
        _id: ID
        messageText: String!
        user: User!
        chatId: String!
        createdAt: String!
        updatedAt: String!
    }

    type Chat {
        _id: ID
        users: [User]
        createdAt: String!
        updatedAt: String!
    }

    type User {
        _id: ID
        username: String
        email: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        user: User
        message(chatId: String!): [Message]
        chat(_id: ID): Chat
        chats(users: ID): [Chat]
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        updateUser(username: String, email: String, password: String): User
        createChat(users: ID): Chat
        createMessage(chatId: ID!, messageText: String!): Message
    }
`;

module.exports = typeDefs;