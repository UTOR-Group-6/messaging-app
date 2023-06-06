const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        chats: [Chat]
    }

    type Chat {
        _id: ID
        messages: [Message]
        users: [User]
        createdAt: String!
    }

    type Message {
        _id: ID
        messageText: String!
        user: String!
        createdAt: String!
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        user: User
        chat(_id: ID): Chat
        findUser(username: String): User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        createChat(users: [ID]): Chat
        updateChat(_id: ID, messageText: String, user: String): Chat
        updateUserChats(_id: ID, chatId: ID): User
    }
`;

module.exports = typeDefs;